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

export default function AddProduct({
  open,
  setOpen,
  country,
  superCategory,
  category: cat,
}) {
  const API_KEY = "https://sheetdb.io/api/v1/dosvxtik6gowo";
  const [selectedSuperCategory, setSuperCategory] = useState("");
  const [superCategoryError, setSuperCategoryError] = useState("");

  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [menuFilter, setMenuFilter] = useState("");

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productNameError, setProductNameError] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [productUrlError, setProductUrlError] = useState("");
  const { globalCsvState, setGlobalCsvState } = useContext(GlobalContext);
  const allSuperCategories = globalCsvState[country];
  const superCategories = Object.keys(allSuperCategories) ?? [];
  const allCategories = globalCsvState[country][selectedSuperCategory] ?? {};
  const Categories = Object.keys(allCategories) ?? [];

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (superCategories.includes(selectedSuperCategory)) {
      setSuperCategoryError("");
    } else if (!!selectedSuperCategory) {
      setSuperCategoryError("Does Not Exist");
    }
  }, [selectedSuperCategory, superCategories]);

  useEffect(() => {
    if (Categories.includes(category)) {
      setCategoryError("");
    } else {
      setCategoryError("Does Not Exist");
    }
  }, [category, Categories]);

  useEffect(() => {
    setSuperCategoryError("");
    setCategoryError("");
    setProductNameError("");
    setProductUrlError("");
  }, [category, selectedSuperCategory, productName, productUrlError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryError("Required");
      return;
    } else if (!superCategory) {
      setSuperCategoryError("Required");
      return;
    } else if (!productName) {
      setProductNameError("Required");
      return;
    } else if (!productUrl) {
      setProductUrlError("Required");
      return;
    }
    try {
      const productId = `${country}-${selectedSuperCategory.replace(
        / /g,
        "-"
      )}-${category.replace(/ /g, "-")}-${productName.replace(/ /g, "-")}`;
      const superCategoryData =
        globalCsvState[country][selectedSuperCategory][category];
      const categoriesArray = superCategoryData.filter((value) => !!value);
      if (categoriesArray.length > 0) {
        //productId will be different so add new row
        fetch(`${API_KEY}?sheet=global-csv`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [
              {
                categoryName: category,
                menuFilter,
                productName,
                productNameUrl: productUrl,
                country: country,
                friendlyProductId: productId,
                superCategory: selectedSuperCategory,
              },
            ],
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            handleClose();
            const dataObj = globalCsvState;
            dataObj[country][selectedSuperCategory][category] = [];
            setGlobalCsvState(dataObj);
          });
      } else {
        fetch(`${API_KEY}/friendlyProductId/${productId}?sheet=global-csv`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              menuFilter,
              productName,
              productNameUrl: productUrl,
            },
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("data added", data);
            handleClose();
            const dataObj = globalCsvState;
            dataObj[country][selectedSuperCategory][category] = [];
            setGlobalCsvState(dataObj);
          });
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
    }
  };

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
        Add new Product
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
        <div className="flex gap-4">
          <div className="flex flex-col gap-8 mb-8">
            <TextField
              placeholder="Super Category Name"
              id="outlined-basic"
              label="Super Category Name"
              variant="outlined"
              value={selectedSuperCategory}
              onChange={(e) => {
                setSuperCategory(e.target.value);
                setCategory("");
              }}
              error={!!superCategoryError}
              helperText={superCategoryError}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={superCategories}
              // sx={{ width: 300 }}
              onChange={(_, value, reason) => {
                if (reason === "clear") {
                  setSuperCategory("");
                }
                setSuperCategory(value);
                setCategory("");
              }}
              renderInput={(params) => (
                <TextField {...params} label="Super Catergory" />
              )}
            />
          </div>
          <div className="flex flex-col gap-8 mb-8">
            <TextField
              placeholder="Category Name"
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              error={!!categoryError}
              helperText={categoryError}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={Categories}
              // sx={{ width: 300 }}
              onChange={(_, value) => {
                setCategory(value);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Catergory" />
              )}
            />
          </div>
          <div className="flex flex-col gap-8 mb-8">
            <TextField
              placeholder="Menu Filters"
              id="outlined-basic"
              label="Menu Filters"
              variant="outlined"
              value={menuFilter}
              onChange={(e) => {
                setMenuFilter(e.target.value);
              }}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[]}
              // sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Menu Filters" />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <TextField
              className="flex-1"
              placeholder="Product Name"
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
              error={!!productNameError}
              helperText={productNameError}
            />
            <TextField
              className="flex-1"
              placeholder="Product Url"
              id="outlined-basic"
              label="Product Url"
              variant="outlined"
              value={productUrl}
              helperText={`Preview Url: product-name-url`}
              onChange={(e) => {
                let newValue = e.target.value;
                const sanitizedValue = newValue.replace(/ /g, "-");
                setProductUrl(sanitizedValue);
              }}
            />
          </div>
          <TextField
            placeholder="Description"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={productDescription}
            onChange={(e) => {
              let newValue = e.target.value;
              setProductDescription(newValue);
            }}
          />
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
              <div className="text-md font-light">{selectedSuperCategory}</div>
            </div>
            <div className="text-slate-900 text-md font-bold font-['Open Sans'] leading-normal">
              Category name
              <div className="text-md font-light">{category}</div>
            </div>
            <div className="text-slate-900 text-md font-bold font-['Open Sans'] leading-normal">
              Product name
              <div className="text-md font-light">{productName}</div>
            </div>
            <div className="text-slate-900 text-md font-bold font-['Open Sans'] leading-normal">
              Product Url
              <div className="text-md font-light">{productUrl}</div>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          className=""
          sx={{ backgroundColor: "#001035", color: "#fff" }}
        >
          Add Product
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
