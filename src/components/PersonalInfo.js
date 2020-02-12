// import React, { Component } from 'react'
// import { connect } from 'react-redux';
// // import image from '../../../assets/authenticated.png';
// import ProfileCard from '../ProfileCard';
// import Col from 'react-bootstrap/Col';

// class PersonalInfo extends Component {

//     render() {
        
//         return (
             
//             <React.Fragment>
//                 <Col className="" sm={12} >

//                     <ProfileCard 
//                         user={this.state.user}
//                         isEditable={true}
//                         inEditMode={this.state.inEditMode}
//                         onClickEdit={this.onClickEdit}
//                         onClickCancel={this.onClickCancel}
//                         onClickSave={this.onClickSave}
//                         onChangeDisplayName={this.onChangeDisplayName}
//                         pendingUpdateCall={this.state.pendingUpdateCall}
//                         entering={this.entering}

//                         // value of image
//                         loadedImage={this.state.image}
//                         // function for change image
//                         onFileSelect={this.onFileSelect}

//                         // error
//                         errors={this.state.errors}
//                     />

//                 </Col>
//             </React.Fragment>

//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         loggedInUser: state
//     }
// }

// export default connect(mapStateToProps)(PersonalInfo);