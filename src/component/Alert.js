import Modal from 'react-bootstrap/Modal';

function CustomAlert(props){

    const {alertState, onHide} = props;
    const {alertContent, alertShow} = alertState;

    return(
        <>
            <Modal
                  onHide={onHide}
                  show={alertShow}
                  size="sm"
                  aria-labelledby="contained-modal-title-vcenter"
                  keyboard={false}
                  className={alertContent.type ==="Success" ? "customModalAlertSuccess" : "customModalAlertFail"}
            >
                  <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        {alertContent.title}
                        </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {alertContent.message}
                  </Modal.Body>
            </Modal>

        </>
    )
}

export default CustomAlert;