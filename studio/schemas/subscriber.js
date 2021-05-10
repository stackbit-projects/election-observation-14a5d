export default {
    "type": "document",
    "name": "subscriber",
    "title": "Subscriber",
    "fields": [
        {
            "type": "string",
            "name": "email",
            "title": "Email",
            "description": "Email address of the subscriber",
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
            "title": "email"
        }
    }
}
