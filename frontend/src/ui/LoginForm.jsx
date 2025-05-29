import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
import useLoginUser from "../features/authentication/useLoginUser";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useLoginUser();

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!form.email) {
      newErrors.email = "邮箱不能为空";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "邮箱格式不正确";
      isValid = false;
    }

    if (!form.password) {
      newErrors.password = "密码不能为空";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "密码长度不能少于6位";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = e => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors(prev => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      mutate(form);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        输入邮箱与密码以登录
      </Typography>

      <TextField
        name="email"
        label="邮箱"
        type="email"
        fullWidth
        required
        value={form.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={errors.email}
        autoComplete="off"
      />

      <TextField
        name="password"
        label="密码"
        type="password"
        fullWidth
        required
        value={form.password}
        onChange={handleChange}
        error={Boolean(errors.password)}
        helperText={errors.password}
        autoComplete="current-password"
      />

      {isError && (
        <Alert severity="error">{error?.message || "登录失败"}</Alert>
      )}

      <Button type="submit" variant="contained" disabled={isPending}>
        {isPending ? "登录中..." : "登录"}
      </Button>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 1 }}
      >
        <Typography
          variant="body2"
          sx={{ cursor: "pointer", color: "primary.main" }}
          onClick={() => navigate("/register")}
        >
          没有账号？注册
        </Typography>

        <Typography
          variant="body2"
          sx={{ cursor: "pointer", color: "primary.main" }}
          onClick={() => navigate("/forgot-password")}
        >
          忘记密码？
        </Typography>
      </Stack>
    </Box>
  );
}
