import React, { Component } from 'react';
import Loading from './loading';

class ListContent extends Component {
    render(){
        if(this.props.isLoading){
            return(
                <div>
                    <p><strong>Loading...</strong></p>
                </div>            
            )
        } else {
            return (
                <div>
                    {this.props.children}
                </div>
            )
        }
    }
}

export default ListContent;