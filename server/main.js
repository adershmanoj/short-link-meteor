import { Meteor } from 'meteor/meteor';
import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';
import { WebApp } from 'meteor/webapp';

Meteor.startup(() => { 
    WebApp.connectHandlers.use((req, res, next) =>{ //redirecting links with WebApp
        const _id=req.url.slice(1); //removing '/'
        const link=Links.findOne({_id});
        if(link){
            res.statusCode=302;
            res.setHeader('Location', link.url );
            res.end();
            Meteor.call('links.trackVisit',_id);
        }
        else{
            next();
        }
    });
});
 