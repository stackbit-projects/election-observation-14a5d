export default {
    "type": "document",
    "name": "partner",
    "title": "Partner",
    "fields": [
        {
            "type": "string",
            "name": "title",
            "title": "Title",
            "description": "The title of the post.",
            "validation": Rule => Rule.required()
        },
        {
            "type": "string",
            "name": "subtitle",
            "title": "Subtitle",
            "description": "The text shown just below the post title.",
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
            "name": "thumb_img_alt",
            "title": "Image alt text",
            "description": "The alt text of the logo for the partner.",
            "validation": null
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
