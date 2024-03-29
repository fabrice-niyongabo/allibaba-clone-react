import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface IConfirmationProps {
  showAlert: boolean;
  setShowAlert: any;
  callback: any;
  title: string;
}
function Confirmation({
  showAlert,
  setShowAlert,
  callback,
  title,
}: IConfirmationProps) {
  return (
    <div>
      <Dialog
        open={showAlert}
        onClose={() => setShowAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <i className="bi bi-exclamation-triangle text-danger" />
          <span className="text-danger">Confirmation</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {title ? title : " Do you want to perform this process?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAlert(false)} color="primary">
            Not Sure
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              callback();
              setShowAlert(false);
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Confirmation;
