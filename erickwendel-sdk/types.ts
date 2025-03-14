export default {
    "scalars": [
        1,
        2,
        3,
        9,
        10
    ],
    "types": {
        "Query": {
            "getTalks": [
                4,
                {
                    "_id": [
                        1
                    ],
                    "title": [
                        2
                    ],
                    "language": [
                        2
                    ],
                    "city": [
                        2
                    ],
                    "country": [
                        2
                    ],
                    "skip": [
                        3
                    ],
                    "limit": [
                        3
                    ]
                }
            ],
            "isAlive": [
                10
            ],
            "getPosts": [
                11,
                {
                    "_id": [
                        1
                    ],
                    "title": [
                        2
                    ],
                    "language": [
                        2
                    ],
                    "portal": [
                        2
                    ],
                    "skip": [
                        3
                    ],
                    "limit": [
                        3
                    ]
                }
            ],
            "getVideos": [
                14,
                {
                    "_id": [
                        1
                    ],
                    "title": [
                        2
                    ],
                    "language": [
                        2
                    ],
                    "skip": [
                        3
                    ],
                    "limit": [
                        3
                    ]
                }
            ],
            "getProjects": [
                16,
                {
                    "_id": [
                        1
                    ],
                    "title": [
                        2
                    ],
                    "language": [
                        2
                    ],
                    "skip": [
                        3
                    ],
                    "limit": [
                        3
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "ID": {},
        "String": {},
        "Int": {},
        "TalkQuery": {
            "totalCount": [
                3
            ],
            "retrieved": [
                3
            ],
            "processedIn": [
                3
            ],
            "talks": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "Talk": {
            "_id": [
                1
            ],
            "title": [
                2
            ],
            "abstract": [
                2
            ],
            "type": [
                2
            ],
            "event": [
                6
            ],
            "slides": [
                2
            ],
            "images": [
                7
            ],
            "video": [
                2
            ],
            "tags": [
                2
            ],
            "location": [
                8
            ],
            "additionalLinks": [
                2
            ],
            "language": [
                2
            ],
            "date": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Event": {
            "link": [
                2
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Image": {
            "url": [
                2
            ],
            "filename": [
                2
            ],
            "size": [
                2
            ],
            "pathId": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Location": {
            "latitude": [
                9
            ],
            "longitude": [
                9
            ],
            "country": [
                2
            ],
            "uf": [
                2
            ],
            "city": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Float": {},
        "Boolean": {},
        "PostQuery": {
            "totalCount": [
                3
            ],
            "retrieved": [
                3
            ],
            "processedIn": [
                3
            ],
            "posts": [
                12
            ],
            "__typename": [
                2
            ]
        },
        "Post": {
            "_id": [
                1
            ],
            "title": [
                2
            ],
            "abstract": [
                2
            ],
            "type": [
                2
            ],
            "link": [
                2
            ],
            "additionalLinks": [
                2
            ],
            "portal": [
                13
            ],
            "tags": [
                2
            ],
            "language": [
                2
            ],
            "date": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Portal": {
            "link": [
                2
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "VideoQuery": {
            "totalCount": [
                3
            ],
            "retrieved": [
                3
            ],
            "processedIn": [
                3
            ],
            "videos": [
                15
            ],
            "__typename": [
                2
            ]
        },
        "Video": {
            "_id": [
                1
            ],
            "title": [
                2
            ],
            "abstract": [
                2
            ],
            "type": [
                2
            ],
            "link": [
                2
            ],
            "additionalLinks": [
                2
            ],
            "tags": [
                2
            ],
            "language": [
                2
            ],
            "date": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ProjectQuery": {
            "totalCount": [
                3
            ],
            "retrieved": [
                3
            ],
            "processedIn": [
                3
            ],
            "projects": [
                17
            ],
            "__typename": [
                2
            ]
        },
        "Project": {
            "_id": [
                1
            ],
            "title": [
                2
            ],
            "abstract": [
                2
            ],
            "type": [
                2
            ],
            "link": [
                2
            ],
            "additionalLinks": [
                2
            ],
            "tags": [
                2
            ],
            "language": [
                2
            ],
            "date": [
                2
            ],
            "__typename": [
                2
            ]
        }
    }
}