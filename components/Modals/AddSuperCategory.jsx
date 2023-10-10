import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import GlobalContext from "../../context/GlobalContext";

const baseUrl = process.env.BASE_URL;
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddSuperCategory({ open, setOpen, country }) {
  const [superCatVal, setSuperCatVal] = useState("");
  const [superCatError, setSuperCatError] = useState("");
  const [superCatLetterError, setSuperCatLetterError] = useState(false);

  const [superCatValUrl, setSuperCatUrl] = useState("");
  const { globalCsvState, setGlobalCsvState } = useContext(GlobalContext);
  const allSuperCategories = globalCsvState[country];
  const superCategories = Object.keys(allSuperCategories) ?? [];
  // console.log('superCategories', superCategories);

  const handleClose = () => {
    setSuperCatVal("");
    setSuperCatUrl("");
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!superCatVal || !superCatValUrl) {
      setSuperCatError("Required");
      return;
    }

    try {
      const myArray = new Array(27);
      myArray[0] = `${country}-${superCatVal.replace(/ /g, "-")}`;
      myArray[1] = country;
      myArray[2] = superCatVal;
      myArray[23] = superCatValUrl;
      const response = await fetch(`${baseUrl}/api/add-super-category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({newCsv:[
          `${country.toLowerCase()}-${superCatVal.toLowerCase()}`,
        ],
        globalCsvData: myArray
      }),
      });

      if (response.ok) {
        // Request was successful
        const data = await response.json();
        const newState = { ...globalCsvState };
        if(!newState[country][superCatVal]){
          newState[country][superCatVal] = {}
        }
        setGlobalCsvState(newState);
        handleClose();
      } else {
        // Handle error
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (superCategories.includes(superCatVal)) {
      setSuperCatError("Already Exists");
    } else if (superCatVal && !/^[A-Z]/.test(superCatVal)) {
      setSuperCatLetterError("First Letter should be Capital");
    } else {
      setSuperCatError("");
      setSuperCatLetterError("");
    }
  }, [superCatVal, superCategories]);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        className="text-center text-white bg-color-blue"
        sx={{ m: 0, p: 2, backgroundColor: "#001035" }}
        id="customized-dialog-title"
      >
        Add new Super Category
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <div className="flex gap-8">
          <div className="flex gap-4">
            <TextField
              placeholder="Super Category Name"
              id="outlined-basic"
              label="Super Category Name"
              variant="outlined"
              value={superCatVal}
              onChange={(e) => {
                setSuperCatVal(e.target.value);
              }}
              error={!!superCatError || !!superCatLetterError}
              helperText={superCatError || superCatLetterError}
            />
            <TextField
              placeholder="Super Category Url"
              id="outlined-basic"
              label="Super Category Url"
              variant="outlined"
              value={superCatValUrl}
              helperText={`Preview Url: product-name-url`}
              onChange={(e) => {
                let newValue = e.target.value;
                const sanitizedValue = newValue.replace(/ /g, "-");
                setSuperCatUrl(sanitizedValue);
              }}
            />
          </div>
        </div>
        <div className="w-full h-[147px] py-4 flex-col justify-start items-start gap-0.5 inline-flex">
          <div className="justify-start items-center gap-1 inline-flex">
            <div className="text-slate-900 text-md font-semibold font-['Open Sans'] leading-tight">
              Preview
            </div>
          </div>
          <div className="self-stretch grow shrink basis-0 px-2 py-3 bg-white border border-slate-900 border-opacity-40 justify-start items-start gap-8 inline-flex">
            <div className="text-slate-900 text-md font-bold font-['Open Sans'] leading-normal">
              Super Category name
              <div className="text-md font-light">{superCatVal}</div>
            </div>
            <div className="text-slate-900 text-md font-bold font-['Open Sans'] leading-normal">
              Super Category Url
              <div className="text-md font-light">{superCatValUrl}</div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          className=""
          sx={{ backgroundColor: "#001035" }}
        >
          Add Super Category
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
