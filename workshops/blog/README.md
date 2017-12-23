

1) Build a database

The first step in the build process is to build a database for all the posts. This will then be used as a guide for the rest of the build process.


I might make a json file like this:
```js
{
 
    byYear : [
 
        {
 
            year : 2017,
            count : 5,
            byMonth : [
 
                month : '03',
                byPage : [
 
                    [
 
                       '/2017/03/29/nodejs-harp/',
                       '/2017/03/27/nodejs-harp/',
                       '/2017/03/24/nodejs-harp/',
                       '/2017/03/28/nodejs-harp/',
                       '/2017/03/26/nodejs-harp/'
 
 
                    ],
 
                    [
 
 
                    ]
 
                ]
 
            ]
 
        }
 
    ]
 
}
```