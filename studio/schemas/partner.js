export default {
    "type": "document",
    "name": "partner",
    "title": "Partner",
    "fields": [
        {
          "type": "boolean",
          "name": "approved",
          "title": "Approved",
          "description": "Set to approved if this partner should be displayed on the site"
        },
        {
            "type": "string",
            "name": "title",
            "title": "Title",
            "description": "The name of the partner individual or organization",
            "validation": Rule => Rule.required()
        },
        {
            "type": "string",
            "name": "subtitle",
            "title": "Subtitle",
            "description": "The text shown just below the partner name, if any.",
            "validation": null
        },
        {
            "type": "image",
            "name": "img_path",
            "title": "Image",
            "description": "The logo for the partner",
            "validation": null
        },
        {
            "type": "string",
            "name": "img_alt",
            "title": "Image alt text",
            "description": "The alt text of the logo for the partner",
            "validation": null
        },
        {
          "type": "boolean",
          "name": "consent",
          "title": "Consent",
          "description": "Did this person consent to their information being used?"
        },
        {
            "type": "string",
            "name": "layout",
            "title": "Layout",
            "hidden": false,
            "validation": Rule => Rule.required(),
            "options": {
                "list": [
                    "partner"
                ]
            }
        },
        {
            "type": "string",
            "name": "stackbit_url_path",
            "title": "URL Path",
            "description": "The URL path of this page relative to site root. For example, the site root page would be \"/\", and partner page would be \"partners/new-post/\"",
            "validation": Rule => Rule.required()
        },
        {
            "type": "string",
            "name": "stackbit_dir",
            "title": "Directory",
            "description": "The directory path where this file is stored",
            "hidden": false,
            "validation": Rule => Rule.required(),
            "options": {
                "list": [
                    "content/pages"
                ]
            }
        },
    ],
    "preview": {
        "select": {
            "title": "title"
        }
    }
}
