import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Autocomplete, TextField } from "@mui/material";
import GlobalContext from "../../context/GlobalContext";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddCategory({ open, setOpen, country, superCategory }) {
  const [selectedSuperCategory, setSuperCategory] = useState("");
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);

  const [categoryUrl, setCategoryUrl] = useState("");
  const { globalCsvState } = useContext(GlobalContext);
  const allSuperCategories = globalCsvState[country];
  const superCategories = Object.keys(allSuperCategories) ?? [];
  // console.log('superCategories', superCategories);

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   if (superCategories.includes(category)) {
  //     setCategoryError(true);
  //   } else {
  //     setCategoryError(false);
  //   }
  // }, [category, superCategories]);

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
        Add new Category
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
        <div className="flex flex-col gap-8 mb-8">
          <TextField
            placeholder="Super Category Name"
            id="outlined-basic"
            label="Super Category Name"
            variant="outlined"
            value={selectedSuperCategory}
            onChange={(e) => {
              setSuperCategory(e.target.value);
            }}
            // error={categoryError}
            // helperText={categoryError ? "Required" : ""}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={superCategories}
            // sx={{ width: 300 }}
            onChange={(_, value) => {
              setSuperCategory(value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Super Catergory" />
            )}
          />
        </div>
        <div className="flex gap-8">
          <div className="flex gap-4">
            <TextField
              placeholder="Category Name"
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              error={categoryError}
              helperText={categoryError ? "Required" : ""}
            />
            <TextField
              placeholder="Category Url"
              id="outlined-basic"
              label="Category Url"
              variant="outlined"
              value={categoryUrl}
              helperText={`Preview Url: category-name-url`}
              onChange={(e) => {
                let newValue = e.target.value;
                const sanitizedValue = newValue.replace(/ /g, "-");
                setCategoryUrl(sanitizedValue);
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
              <div className="text-md font-light">{category}</div>
            </div>
            <div className="text-slate-900 text-md font-bold font-['Open Sans'] leading-normal">
              Category name
              <div className="text-md font-light">{category}</div>
            </div>
            <div className="text-slate-900 text-md font-bold font-['Open Sans'] leading-normal">
              Category Url
              <div className="text-md font-light">{categoryUrl}</div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          className=""
          sx={{ backgroundColor: "#001035" }}
        >
          Add Category
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
