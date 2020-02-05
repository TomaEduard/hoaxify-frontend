import React, { Component } from 'react';
import ButtonWithProgress from './ButtonWithProgress';

export class Modal extends Component {
    render() {

        const { 
            title,
            visible,
            body,
            okButton,
            cancelButton,
            onClickOk,
            onClickCancel,
            pandingApiCall
            } = this.props;

        let rootClass = 'modal fade';
        let rootStyle;
        if(visible) {
            rootClass += ' d-block show';
            rootStyle = { backgroundColor: '#000000b0' };
        }
        return (
            <div className={rootClass} style={rootStyle} data-testid="model-root" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                    <button 
                        type="button" 
                        className="close" 
                        data-dismiss="modal" 
                        aria-label="Close"
                        onClick={onClickCancel}
                    >
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {body}
                </div>
                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        data-dismiss="modal"
                        onClick={onClickCancel}
                        disabled={pandingApiCall}
                    >
                        {cancelButton}
                    
                    </button>

                    <ButtonWithProgress 
                        type="button" 
                        className="btn btn-danger"
                        onClick={onClickOk}
                        disabled={pandingApiCall}
                        pendingApiCall={pandingApiCall}
                        text={okButton}
                    />

                </div>
                </div>
            </div>
            </div>
        )
    }
}

Modal.defaultProps = {
    okButton: 'Ok',
    cancelButton: 'Cancel'
};

export default Modal;