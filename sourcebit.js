const _ = require('lodash');

const isDev = process.env.NODE_ENV === 'development';


module.exports = {
    plugins: [
        {
            module: require('sourcebit-source-sanity'),
            options: {
                accessToken: process.env.SANITY_ACCESS_TOKEN,
                projectId: process.env.SANITY_PROJECT_ID || 'jst252mm',
                dataset: process.env.SANITY_DATASET || 'production',
                isPreview: isDev,
                watch: isDev
            }
        },
        {
            module: require('sourcebit-target-next'),
            options: {
                liveUpdate: isDev,
                flattenAssetUrls: true,
                pages: [
                    { path: '/{stackbit_url_path}', predicate: _.matchesProperty('__metadata.modelName', 'advanced') },
                    { path: '/{stackbit_url_path}', predicate: _.matchesProperty('__metadata.modelName', 'signOn') },
                    { path: '/{stackbit_url_path}', predicate: _.matchesProperty('__metadata.modelName', 'page') },
                    { path: '/{stackbit_url_path}', predicate: _.matchesProperty('__metadata.modelName', 'post') },
                    { path: '/{stackbit_url_path}', predicate: _.matchesProperty('__metadata.modelName', 'partner') }
                ],
                commonProps: (items) => {
                    return {
                        pages: _.filter(items, item => ["advanced","signOn","page","post","partner"].includes(_.get(item, '__metadata.modelName'))),
                        data: {
                            config: _.find(items, _.matchesProperty('__metadata.modelName', 'config'))
                        }
                    };
                }
            }
        }
    ]
};
