import React from 'react';
import sanityClient from "../client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import _ from 'lodash';

import {markdownify} from '../utils';
import FormField from './FormField';

const FILE_SIZE = 500000;

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export default class SectionForm extends React.Component {
    constructor() {
        super();
        this.state = { submitted: false, img_path: null };
    }
    render() {
        let section = _.get(this.props, 'section', null);

        const slugify = str => {
          str = str.replace(/^\s+|\s+$/g, ''); // trim
          str = str.toLowerCase();

          // remove accents, swap ñ for n, etc
          var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
          var to   = "aaaaeeeeiiiioooouuuunc------";
          for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
          }

          str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

          return `partner/${str}`;
        };

        // validation for the form fields
        const validationSchema = Yup.object({
          title: Yup.string().required(),
          subtitle: Yup.string(),
          img_path: Yup.mixed().test('fileSize', "File Size is too large", value => value ? value.size <= FILE_SIZE : true).test('fileType', "Unsupported File Format", value => value ? SUPPORTED_FORMATS.includes(value.type) : true),
          img_alt: Yup.string(),
          consent: Yup.bool().oneOf([true], 'This is a required field')
        });

        // start off fields as blank
        const initialValues = {
          _type: "partner",
          layout: "partner",
          stackbit_dir: "content/pages",
          title: "",
          subtitle: "",
          img_alt: "",
          img_path: "",
          consent: false,
        };

        // send data to Sanity CMS via API
        const onSubmit = (values) => {
          const slug = slugify(values.title);

          const request = { ...values, stackbit_url_path: slug };

          sanityClient.assets
            .upload('image', img_path, {contentType: img_path.type, filename: img_path.name})
            .then((document) => {
              console.log('The file was uploaded!', document)
            })
            .catch((error) => {
              console.error('Upload failed:', error.message)
            })

          sanityClient.create(request)
            .then(() => {
              alert(`Your response has been recorded.`);
              this.setState({submitted: true});
            });
        };

        const renderError = (message) => <p className="form-error">{message}</p>;


        return (
            <section id={_.get(section, 'section_id', null)} className="block block-form">
              {_.get(section, 'title', null) && (
              <h2 className="block-title underline inner-sm">{_.get(section, 'title', null)}</h2>
              )}
              <div className="block-content inner-sm">
                {_.get(section, 'content', null) && (
                markdownify(_.get(section, 'content', null))
                )}
                {this.state.submitted ? (
                  <div>Danke</div>
                ) : (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                      await onSubmit(values);
                      resetForm();
                    }}
                  >
                    {props => (
                      <Form>
                        <div className="form-group">
                          <label className="form-label" htmlFor="title">
                            Name
                          </label>
                          <div>
                            <Field
                              name="title"
                              type="text"
                              className="form-input"
                            />
                            <ErrorMessage name="title" render={renderError} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="subtitle">
                            Comments
                          </label>
                          <div>
                            <Field
                              name="subtitle"
                              type="text"
                              className="form-input"
                              component="textarea"
                            />
                            <ErrorMessage name="subtitle" render={renderError} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="img_path">
                            Logo
                          </label>
                          <div>
                            <input
                              id="img_path"
                              name="img_path"
                              type="file"
                              onChange={event => {
                                props.setFieldValue('img_path', event.currentTarget.files[0]);
                              }}
                            />
                            <ErrorMessage name="img_path" render={renderError} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label" htmlFor="img_alt">
                            Alt text for the logo, if any
                          </label>
                          <div>
                            <Field
                              name="img_alt"
                              type="text"
                              className="form-input"
                            />
                            <ErrorMessage name="img_alt" render={renderError} />
                          </div>
                        </div>
                        <div className="form-group">
                          <label>
                            <Field type="checkbox" name="consent" />{' '}
                            I understand that this form is storing my submitted information so my signature may be added to the letter.
                          </label>
                          <div>
                            <ErrorMessage name="consent" render={renderError} />
                          </div>
                        </div>

                        <button type="submit" className="button is-primary">
                          Submit
                        </button>
                      </Form>
                    )}
                  </Formik>
                )}
              </div>
            </section>
        );
    }
}
