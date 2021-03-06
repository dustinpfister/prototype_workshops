

## Build a database

The first step in the build process is to build a database for all the posts. This will then be used as a guide for the rest of the build process.


The database looks like this

```js
{
    "reports": [{
            "uri": "source\\_posts\\a1.md",
            "categories": "blog",
            "tags": ["blog", "js"],
            "header": {
                "date": "2017-04-01T12:22:00.000Z",
                "categories": "blog",
                "tags": ["blog", "js"]
            },
            "date": "2017-04-01T12:22:00.000Z",
            "update": "2017-12-23T02:55:39.148Z",
            "y": 2017,
            "m": "04",
            "d": "01",
            "path": "2017/04/01"
        }, {
            "uri": "source\\_posts\\a2.md",
            "categories": "blog",
            "tags": ["blog", "js"],
            "header": {
                "date": "2017-04-02T12:22:00.000Z",
                "categories": "blog",
                "tags": ["blog", "js"]
            },
            "date": "2017-04-02T12:22:00.000Z",
            "update": "2017-12-23T02:55:56.674Z",
            "y": 2017,
            "m": "04",
            "d": "02",
            "path": "2017/04/02"
        }, {
            "uri": "source\\_posts\\a3.md",
            "categories": "blog",
            "tags": ["blog", "js"],
            "header": {
                "date": "2017-04-03T12:22:00.000Z",
                "categories": "blog",
                "tags": ["blog", "js"]
            },
            "date": "2017-04-03T12:22:00.000Z",
            "update": "2017-12-23T02:56:11.816Z",
            "y": 2017,
            "m": "04",
            "d": "03",
            "path": "2017/04/03"
        }, {
            "uri": "source\\_posts\\a4.md",
            "categories": "blog",
            "tags": ["blog", "js"],
            "header": {
                "date": "2017-04-04T12:22:00.000Z",
                "categories": "blog",
                "tags": ["blog", "js"]
            },
            "date": "2017-04-04T12:22:00.000Z",
            "update": "2017-12-23T02:56:45.270Z",
            "y": 2017,
            "m": "04",
            "d": "04",
            "path": "2017/04/04"
        }, {
            "uri": "source\\_posts\\a5.md",
            "categories": "blog",
            "tags": ["blog", "js"],
            "header": {
                "date": "2017-04-05T12:22:00.000Z",
                "categories": "blog",
                "tags": ["blog", "js"]
            },
            "date": "2017-04-05T12:22:00.000Z",
            "update": "2017-12-23T02:56:39.904Z",
            "y": 2017,
            "m": "04",
            "d": "05",
            "path": "2017/04/05"
        }, {
            "uri": "source\\_posts\\first.md",
            "categories": "blog",
            "tags": ["blog", "js"],
            "header": {
                "date": "2017-02-04T12:22:00.000Z",
                "categories": "blog",
                "tags": ["blog", "js"]
            },
            "date": "2017-02-04T12:22:00.000Z",
            "update": "2017-12-23T01:42:08.902Z",
            "y": 2017,
            "m": "02",
            "d": "04",
            "path": "2017/02/04"
        }, {
            "uri": "source\\_posts\\two.md",
            "categories": "misc",
            "tags": ["misc"],
            "header": false,
            "date": "2017-12-23T01:07:37.665Z",
            "update": "2017-12-23T01:17:09.372Z",
            "y": 2017,
            "m": "12",
            "d": "22",
            "path": "2017/12/22"
        }
    ],
    "page": {
        "y2017": {
            "m04": ["source\\_posts\\a1.md", "source\\_posts\\a2.md", "source\\_posts\\a3.md", "source\\_posts\\a4.md", "source\\_posts\\a5.md"],
            "m02": ["source\\_posts\\first.md"],
            "m12": ["source\\_posts\\two.md"]
        }
    }
}
```