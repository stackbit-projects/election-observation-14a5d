import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import {Layout} from '../components/index';
import {getPages, Link, withPrefix} from '../utils';

export default class SignOn extends React.Component {
    render() {
        let display_posts = _.orderBy(getPages(this.props.pages, '/partner'), 'date', 'desc');
        return (
            <Layout {...this.props}>
              <header className="post-header inner-sm">
                <h1 className="post-title underline">{_.get(this.props, 'page.title', null)}</h1>
              </header>
              <div className="post-feed">
                <div className="post-feed-inside">
                  {_.map(display_posts, (post, post_idx) => (
                  <article key={post_idx} className="post post-card">
                    <div className="post-inside">
                      {_.get(post, 'img_path', null) && (
                      <Link className="post-thumbnail" href={withPrefix(_.get(post, 'stackbit_url_path', null))}>
                        <img src={withPrefix(_.get(post, 'img_path', null))} alt={_.get(post, 'img_alt', null)} />
                      </Link>
                      )}
                      <header className="post-header">
                        <h2 className="post-title"><Link href={withPrefix(_.get(post, 'stackbit_url_path', null))} rel="bookmark">{_.get(post, 'title', null)}</Link></h2>
                      </header>
                      {_.get(post, 'subtitle', null) && (
                      <div className="post-content">
                        <p>{_.get(post, 'subtitle', null)}</p>
                      </div>
                      )}
                    </div>
                  </article>
                  ))}
                </div>
              </div>
            </Layout>
        );
    }
}
