import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
export const Links = new Mongo.Collection('links');

if(Meteor.isServer){
    Meteor.publish('links', function(){
        const userId=this.userId;
        return Links.find({userId});
    });
}
Meteor.methods({
    'links.insert'(url){
        if(!this.userId){
            throw new Meteor.Error('err_login');   
        }
        new SimpleSchema({
        url:{
            type: String,
            regEx: SimpleSchema.RegEx.Url,
            optional:false
        }
        }).validate({url});
        Links.insert({
            url,
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        })  
    },
    'links.setVisibility'(_id, visible){
        if(!this.userId)
            throw new Meteor.Error('err_login');
        new SimpleSchema({
            _id:{
                type: String,
                min: 1
            },
            visible:{
                type: Boolean  
            }
        }).validate({_id, visible});
        Links.update({
            _id,
            userId: this.userId
        },{ $set: { visible } })
    },
    'links.trackVisit'(_id){
        new SimpleSchema({
            _id:{
                type: String,
                min: 1
            }
        }).validate({_id});
        Links.update({ _id }, {
            $set: {lastVisitedAt: new Date().getTime()},
            $inc: {visitedCount: 1} 
        })
    }
})