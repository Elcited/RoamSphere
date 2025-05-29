import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import useRegisterUser from "../features/authentication/useRegisterUser";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState({});
  const { mutate, isPending, isSuccess, isError, error } = useRegisterUser();

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "用户名不能为空";

    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "请输入有效邮箱";

    if (formData.password.length < 6) newErrors.password = "密码至少6位";

    if (formData.passwordConfirm !== formData.password)
      newErrors.passwordConfirm = "两次输入的密码不一致";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;

    mutate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 400, mx: "auto", mt: 5 }}
    >
      <Typography variant="h5" mb={2}>
        注册您在RoamSphere的账号
      </Typography>

      <TextField
        label="用户名"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.username}
        helperText={errors.username}
        autoComplete="off"
      />

      <TextField
        label="邮箱"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
        autoComplete="off"
      />

      <TextField
        label="密码"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
        autoComplete="new-password"
      />

      <TextField
        label="确认密码"
        name="passwordConfirm"
        type="password"
        value={formData.passwordConfirm}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.passwordConfirm}
        helperText={errors.passwordConfirm}
        autoComplete="new-password"
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isPending}
      >
        {isPending ? "提交中..." : "注册"}
      </Button>

      {isSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          注册成功！
        </Alert>
      )}

      {isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error.message}
        </Alert>
      )}
    </Box>
  );
}
