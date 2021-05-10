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
        this.state = {
          document: null,
          submitted: false,
        };
    }
    render() {
        let section = _.get(this.props, 'section', null);

        // validation for the form fields
        const validationSchema = Yup.object({
          email: Yup.string().email().required(),
        });

        // start off fields as blank
        const initialValues = {
          _type: "subscriber",
          stackbit_dir: "content/pages",
          email: "",
        };

        // send data to Sanity CMS via API
        const onSubmit = (values) => {
          const request = { ...values };

          sanityClient.create(request)
            .then(response => {
              this.setState({submitted: true, document: response});
              alert(`Your response has been recorded.`);
            })
            .catch((error) => {
              console.error('Upload failed:', error.message)
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
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                          <div>
                            <Field
                              name="email"
                              type="text"
                              className="form-input"
                            />
                            <ErrorMessage name="email" render={renderError} />
                          </div>
                        </div>
                        <button type="submit" className="button is-primary">
                          Updates erhalten
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
