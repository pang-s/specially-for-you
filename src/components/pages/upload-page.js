import React from "react";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "firebase/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import { FIREBASE_CONFIG } from "../../app/firebase-config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseApp = initializeApp(FIREBASE_CONFIG);
const storage = getStorage(firebaseApp);
const maxAttempts = 3;
const isFirebaseUpload = true;

class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasUploaded: false,
      numAttempts: 0,
      text: "Please wait...",
      showNextButton: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (isFirebaseUpload) {
      this.saveJsonFile();
    }
  }

  componentWillUnmount() {
    this.setState({
      hasUploaded: false,
      numAttempts: 0,
    });
  }

  saveJsonFile = () => {
    this.setState((state, props) => ({
      hasUploaded: false,
      numAttempts: state.numAttempts + 1,    
    }));

    var date = new Date();
    var folder = "participant_" + this.props.init.participantNum;
    let fileKey = folder + "_log_file_" + date.toISOString() + ".json";

    var child = folder + "/" + fileKey;
    const storageRef = ref(storage, child);

    const blob = new Blob([JSON.stringify(this.props.state, null, 2)], {
      type: "application/json",
    });

    const uploadTask = uploadBytesResumable(storageRef, blob);
    this.upload(uploadTask);

    return fileKey;
  };

  upload(uploadTask) {
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Keep uploading up to maxAttempts
        if (this.state.numAttempts < maxAttempts) {
          this.saveJsonFile();
        } else {
          this.setState({
            hasUploaded: false,
            text: "Sorry, something is wrong. Please click to download the text file below and email it to psu62@uclive.ac.nz",
          });
        }

        console.log("Failed to upload logs to firebase");
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );

    this.completeUpload();
  }

  completeUpload() {
    this.setState({
      hasUploaded: true,
      text: "Upload success!",
    });

    this.props.handleNext();
  }

  getLogJsonValue() {
    return this.props.state;
  }

  getLogJsonString(hasIndent) {
    let value = this.getLogJsonValue();
    let jsonString = JSON.stringify(value);

    if (hasIndent) {
      jsonString = JSON.stringify(value, null, 5);
    }
    return jsonString;
  }

  thanks() {
    this.setState({
      showNextButton: true,
    });
  }

  render() {
    var jsonString = this.getLogJsonString(true);
    // this might miss out logs on this page
    var blob = new Blob([jsonString], {
      type: "application/json",
    });

    return (
      <div>
        <textarea value={jsonString} cols="80" rows="10" readOnly />

        {this.state.numAttempts >= maxAttempts ? (
          <div>
            <Typography>
              <a
                id="download"
                download="PATTERN.json"
                href={URL.createObjectURL(blob)}
                onClick={this.thanks.bind(this)}
              >
                Click to download
              </a>
            </Typography>
          </div>
        ) : null}

        {this.state.showNextButton ? <div>{this.props.nextButton}</div> : null}
      </div>
    );
  }
}

UploadPage.propTypes = {
  state: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    state: state,
    init: state.init,
  };
};

export default connect(mapStateToProps, { })(UploadPage);
