

import {
  useEffect,
  useState,
} from "react";

const emptyForm = {
  name: "",
  email: "",
  mobile: "",
  country: "",
  state: "",
  district: "",
};

export const useEmployeeForm = (
  employee
) => {
  const [form, setForm] =
    useState(emptyForm);

  const [errors, setErrors] =
    useState({});

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name || "",
        email: employee.email || "",
        mobile: employee.mobile || "",
        country:
          employee.country || "",
        state: employee.state || "",
        district:
          employee.district || "",
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [employee]);

  const validate = () => {
    const nextErrors = {};

    const name = form.name.trim();
    const email = form.email.trim();
    const mobile = form.mobile.trim();

    if (!name) {
      nextErrors.name =
        "Name is required.";
    } else if (
      name.length < 2 ||
      name.length > 50
    ) {
      nextErrors.name =
        "Name must be 2–50 characters.";
    }

    if (!email) {
      nextErrors.email =
        "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      nextErrors.email =
        "Enter a valid email.";
    }

    if (!mobile) {
      nextErrors.mobile =
        "Mobile is required.";
    } else if (
      !/^\d{10}$/.test(mobile)
    ) {
      nextErrors.mobile =
        "Mobile must contain exactly 10 digits.";
    }

    if (!form.country) {
      nextErrors.country =
        "Country is required.";
    }

    if (!form.state.trim()) {
      nextErrors.state =
        "State is required.";
    } else if (
      form.state.trim().length > 40
    ) {
      nextErrors.state =
        "Maximum 40 characters.";
    }

    if (!form.district.trim()) {
      nextErrors.district =
        "District is required.";
    } else if (
      form.district.trim().length > 40
    ) {
      nextErrors.district =
        "Maximum 40 characters.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors)
        .length === 0
    );
  };

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const reset = () => {
    setForm(emptyForm);
    setErrors({});
  };

  return {
    form,
    errors,
    handleChange,
    validate,
    reset,
  };
};
