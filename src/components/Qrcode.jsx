import { useState } from "react";
import QRCode from "qrcode";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { jsPDF } from "jspdf";

const Qrcode = () => {
  const [text, setText] = useState("");
  const [qr, setQr] = useState("");

  const inputHandler = (e) => {
    setText(e.target.value);
  };

  const opts = {
    width: 800,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#F2F2F2",
    },
  };

  const GenerateQRCode = () => {
    QRCode.toDataURL(text, opts, (err, text) => {
      if (err) {
        return alert(err);
      }

      setQr(text);
    });
  };

  const generatePdf = () => {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [140, 40],
    });

    pdf.setFontSize(20);
    pdf.text("QR Code Generator", 60, 10);

    pdf.setFontSize(10);
    pdf.text("TEST", 60, 20);

    pdf.addImage(qr, "png", 0, 0, 40, 40);
    pdf.save("qrcode.pdf");
  };

  return (
    <div className="app">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Write Your Value"
        value={text}
        onChange={inputHandler}
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        onClick={GenerateQRCode}
      >
        Generate
      </Button>
      {qr && (
        <>
          <img src={qr} alt={qr} />
          <Box display="flex" justifyContent="center" alignItems="center">
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                color="success"
                href={qr}
                download="qrcode.png"
                endIcon={<FileDownloadIcon />}
              >
                Download to PNG
              </Button>
              <Button
                variant="contained"
                color="success"
                endIcon={<FileDownloadIcon />}
                onClick={generatePdf}
              >
                Download to PDF
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </div>
  );
};

export default Qrcode;
