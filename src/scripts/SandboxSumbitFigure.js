import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FormHelperText from '@material-ui/core/FormHelperText';
import Collapse from '@material-ui/core/Collapse';
import DoneIcon from '@material-ui/icons/Done';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const axios = require('axios');
import { CancelToken, get, post } from 'axios';

import SandboxDefaultExportSizes from '../configs/SandboxDefaultExportSizes';

const darkGrey = '#E6E6E6';
const errorBgColor = red[500];
const messageSentBgColor = green[700];

const useStyles = makeStyles((theme) => ({
  exportModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  exportModalDiv: {
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    },
    backgroundColor: theme.palette.background.paper,
    border: '0px solid transparent',
    outline: 'unset',
    borderRadius: '4px',
    padding: theme.spacing(2, 4, 3)
  },
  exportHeaderText: {
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${darkGrey}`
  },
  exportContainer: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  exportStart: {
    display: 'flex',
    marginRight: 'auto'
  },
  exportEnd: {
    display: 'flex'
  },
  exportDescriptionText: {
    marginBottom: theme.spacing(2),
    fontSize: '.9em',
    [theme.breakpoints.down('sm')]: {
      fontSize: '.75em'
    }
  },
  exportButtons: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  exportForm: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  exportInputVerify: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  exportInput: {
    margin: theme.spacing(1),
    width: '100%'
  },
  exportHeaderIcon: {
    fontSize: '1.65rem',
    marginBottom: theme.spacing(-0.3)
  },
  exportMessage: {
   margin: theme.spacing(1),
   width: '100%',
 },
 figureErrorText: {
   color: errorBgColor,
   marginLeft: theme.spacing(2),
   marginTop: theme.spacing(0),
   paddingTop: theme.spacing(0)
 },
 messageSentText: {
   color: messageSentBgColor
 },
 messageDoneIcon: {
   color: messageSentBgColor,
 }
}));

export default function SandboxSumbitFigure(props) {
  const classes = useStyles();
  const { open } = props;
  const { handleCloseFigure } = props;

  const heading = 'Send to TSU'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [figureURL, setFigureURL] = useState(window.location.href);
  const [message, setMessage] = useState('');
  const [authorKey, setAuthorKey] = useState('vrzsjJNwaEyfSYuu75RxyQ');
  const [authorVerified, setAuthorVerified] = useState(false);
  const [keyDisabled, setKeyDisabled] = useState(true);
  const [emailValid, setEmailValid] = useState(false);
  const [nameValid, setNamelValid] = useState(false);
  const [messageSent, setmMessageSent] = useState(false);

  const emailErrorLabel = !emailValid ? <FormHelperText style={{ display: keyDisabled ? 'none' : 'flex' }} className={classes.figureErrorText}>{email} address is not valid</FormHelperText> : '';
  const emailNamerLabel = !nameValid ? <FormHelperText style={{ display: keyDisabled ? 'none' : 'flex' }} className={classes.figureErrorText}>Name is required</FormHelperText> : '';

  async function submitFigure() {
    setFigureURL(window.location.href);

    const AUTHOR_KEY = authorKey

    const sumbitURL = 'https://hh0t92676a.execute-api.us-east-1.amazonaws.com/dev/submit'
    const figureInfoMessage = {
      name,
      email,
      message,
      figureURL,
      AUTHOR_KEY
    }

    const axiosConfig = {
      headers: {
        'Accept': '*/*',
        'content-type': 'application/json'
      }
    };

    let res = await post(sumbitURL, JSON.stringify(figureInfoMessage), axiosConfig)

    if (res.status === 200) {
      handleCloseFigure(false);
      return "ok"
    } else {
      console.error();("There was an error.  Please try again later.")
      handleCloseFigure(false);
      return "failed"
    }
  }

  // check aother verification code
  const checkAuthorVerification = (key) => {
    const AUTHOR_KEY = key
    const requestData = { AUTHOR_KEY }
    const verifyAuthorURL = 'https://hh0t92676a.execute-api.us-east-1.amazonaws.com/dev/verifyAuthor'

    const axiosConfig = {
      headers: {
        'content-type': 'text/plain'
      }
    };

    // call to api to veify the author key
    axios.post(verifyAuthorURL, requestData, axiosConfig )
      .then((response) => {
        setAuthorVerified(response.data.verifyAuthor);
        return response.data.verifyAuthor;
      })
      .catch((error) => {
        // handle error
        console.error(`SanboxControls loadData error: ${error}`); // eslint-disable-line no-console
        return [''];
      });
  }

  const validateName = (text) => {
    return (text.length > 1)
  }

  const validateEmailAddress = (text) => {
    if (text.length < 4) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // handle authorKey change
  const handleAuthorKeyChange = (event) => {
    const text = event.currentTarget.value;
    setAuthorKey(text);
    checkAuthorVerification(text);
  };

  // handle name change
  const handleNameChange = (event) => {
    const contactName = event.currentTarget.value;
    setNamelValid(validateName(contactName))
    setName(contactName);
  };

  // handle email change
  const handleEmailChange = (event) => {
    const contactEmail = event.currentTarget.value;
    setEmailValid(validateEmailAddress(contactEmail))
    setEmail(contactEmail);
  };

  // handle message change
  const handleMessageChange = (event) => {
    setMessage(event.currentTarget.value);
  };

  // handle export modal close event
  const handleClose = (event) => {
    handleCloseFigure(false);
  };

  useEffect(() => {
    if (authorVerified) setKeyDisabled(false)
    if (!authorVerified) setKeyDisabled(true)

  }, [authorVerified]);

  return (
      <Modal
        disableBackdropClick
        disableEscapeKeyDown
        className={classes.exportModal}
        classes={{ focused: classes.exportModal }}
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description' >
        <div className={classes.exportModalDiv}>
          <h2 id='simple-modal-title' className={classes.exportHeaderText}>
            <MailOutlineIcon className={classes.exportHeaderIcon}/> {heading}
          </h2>
          <div className={classes.exportDescriptionText}>
            You must have an Author Key to sumbit the figure. Author keys cannot be requested and are only
            provied to selected NCA authors, by TSU.
          </div>
          <div className={classes.exportDescriptionText}>
            Once a valid Author key is entered, you can submit the current figure to TSU.
            Please note that you must include your email, name and any details about figure.
          </div>
          <TextField
            className={classes.exportInputVerify}
            id='outlined-text-authorKey'
            required
            variant='outlined'
            label='Author Key'
            type='text'
            value={authorKey}
            onBlur={handleAuthorKeyChange}
            onChange={handleAuthorKeyChange}
            InputLabelProps={{ shrink: true }}  />

          <Collapse in={messageSent}>
            <h2 id='simple-modal-title' className={classes.messageSentText}>
              <DoneIcon className={classes.messageDoneIcon}/>Message Sent!
            </h2>
          </Collapse>

          <Collapse in={!keyDisabled}>
          <FormControl className={classes.exportForm}>
              <TextField
                className={classes.exportInput}
                id='outlined-text-name'
                required
                variant='outlined'
                label='Name'
                type='text'
                disabled={keyDisabled}
                value={name}
                onChange={handleNameChange}
                error={!nameValid}
                InputLabelProps={{ shrink: true }} />
                {emailNamerLabel}
              <TextField
                className={classes.exportInput}
                id='outlined-text-email'
                required
                variant='outlined'
                label='Email'
                type='text'
                disabled={keyDisabled}
                value={email}
                onChange={handleEmailChange}
                error={!emailValid}
                InputLabelProps={{ shrink: true }}  />
              {emailErrorLabel}
              <TextField
                className={classes.exportMessage}
                id='outlined-text-message'
                variant='outlined'
                label='Details'
                type='text'
                disabled={keyDisabled}
                value={message}
                rows={4}
                multiline
                onChange={handleMessageChange}
                InputLabelProps={{ shrink: true }}  />
            </FormControl>
          </Collapse>

          <div className={classes.exportContainer}>
            <div className={classes.exportStart}>
              <Button
                className={classes.exportButtons}
                onClick={submitFigure}
                color='primary'
                variant='contained'
                disabled={(keyDisabled || !nameValid || !emailValid )}
                startIcon={<MailOutlineIcon />}>Submit Figure
              </Button>
            </div>
            <div className={classes.exportEnd}>
              <Button
                className={classes.exportButtons}
                onClick={handleClose}
                color='default'
                variant='contained' >Close
              </Button>
            </div>
          </div>
        </div>
      </Modal>
  );
}

SandboxSumbitFigure.propTypes = {
  handleCloseFigure: PropTypes.func,
  open: PropTypes.bool
};
