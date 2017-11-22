import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import LinksListItem from './LinksListItem';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            links:[]
        }
    }
    componentDidMount(){
        this.linksTracker=Tracker.autorun(()=>{
            Meteor.subscribe('links');
            const links=Links.find({
               visible: Session.get('showVisible')
            }).fetch()
            this.setState({links})
        });   
    } 
    componentWillUnmount(){
        this.linksTracker.stop();
    }
    renderLinkListItems(){
        if(this.state.links.length === 0){
            return (<div className='item'><p className='item__status'>No links found</p></div>)   
        }
        return this.state.links.map(function(link){
            const absUrl=Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} absUrl={absUrl} {...link}/>
        });
    }
    render(){
        return (
            <div>
                 <div>
                    <FlipMove maintainContainerHeight={true}>
                    {this.renderLinkListItems()}
                    </FlipMove>
                </div>
            </div>
        )
    }
}