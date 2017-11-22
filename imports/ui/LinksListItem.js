import React from 'react';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

function renderText(copy){ //renders button text dynamically
    if(copy)
        return "copied";
    else
        return "copy";
}
export default class LinksListItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            copy: false //to check copied state   
        }
    }
    componentDidMount(){ //clipboard functionality
        this.clipboard= new Clipboard(this.refs.copy);   
        this.clipboard.on('success', ()=>{
            this.setState({copy:true});
            setTimeout(()=>this.setState({copy:false}),1000);
        });
        this.clipboard.on('error', ()=>alert("Unable to copy. Please manually copy"));
    }
    componentWillUnmount(){
        this.clipboard.destroy();
    }
    renderStats(){ //visits and last visited at using moments package
        const visitMessage= this.props.visitedCount ===1 ? 'visit' : 'visits';
        let visitedMessage= null;
        
        if(typeof this.props.lastVisitedAt === 'number'){
            visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`
        }
        return(
            <p className='item__message'>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
        )
    }
    render(){
        return (
            <div className='item'>
                <h2>{this.props.url}</h2>
                <p className='item__message'>{this.props.absUrl}</p>
                {this.renderStats()}
                <a className='button button--pill button--link' href={this.props.absUrl} target="_blank">Visit </a> 
                <button className='button button--pill' ref="copy" data-clipboard-text={this.props.absUrl}>{renderText(this.state.copy)}</button>
                <button className='button button--pill' onClick={()=>{
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
                }}>
                    {this.props.visible?"hide":"show"}
                </button>
            </div>
        )
    }
}
LinksListItem.propTypes={ //setting proptypes for LinkListItems
    _id: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    absUrl: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
    visitedCount: React.PropTypes.number.isRequired,
    lastVisitedAt: React.PropTypes.number
}