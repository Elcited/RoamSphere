import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  Radio,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import useUpdateUserInfo from "../features/authentication/useUpdateUserInfo";
import useUpdatePassword from "../features/authentication/useUpdatePassword";

const PageWrapper = styled.div`
  min-width: 550px;
  margin: 4rem auto;
  padding: 3rem;
  border-radius: 1.2rem;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.05);
  background-color: #fff;
`;

const FormWrapper = styled.div`
  padding: 0.6rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 2.4rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const GenderOptions = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const ActionButtons = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;

function UserInfoEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { field, label, value } = location.state || {};
  const [formValue, setFormValue] = useState(value || "");

  const today = new Date();
  const [birthday, setBirthday] = useState({
    year: value?.split?.("-")[0] || "",
    month: value?.split?.("-")[1] || "",
    day: value?.split?.("-")[2] || "",
  });

  // 👇 处理密码相关状态
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    mutate: mutateUserInfo,
    isPending,
    isSuccess,
    isError,
    error,
  } = useUpdateUserInfo();

  const { mutate: mutatePassword, isPending: isChangingPwd } =
    useUpdatePassword();

  const handleSubmit = e => {
    e.preventDefault();

    if (field === "password") {
      if (!currentPassword || !newPassword || !newConfirmPassword) {
        setPasswordError("请填写完整的密码信息");
        return;
      }
      if (newPassword !== newConfirmPassword) {
        setPasswordError("新密码和确认密码不一致");
        return;
      }

      mutatePassword(
        {
          currentPassword,
          newPassword,
          newConfirmPassword,
        },
        {
          onSuccess: () => {
            navigate(-1);
          },
        }
      );
      return;
    }

    const finalValue =
      field === "birthday"
        ? `${birthday.year}-${birthday.month}-${birthday.day}`
        : formValue;

    mutateUserInfo(
      {
        [field]: finalValue,
      },
      {
        onSuccess: () => {
          navigate(-1);
        },
      }
    );
  };

  const renderField = () => {
    if (["name", "email", "phone"].includes(field)) {
      return (
        <TextField
          label={`请输入${label}`}
          fullWidth
          value={formValue}
          onChange={e => setFormValue(e.target.value)}
        />
      );
    }

    if (field === "gender") {
      return (
        <GenderOptions>
          {["男", "女", "不方便透露"].map(opt => (
            <FormControlLabel
              key={opt}
              value={opt}
              control={
                <Radio
                  checked={formValue === opt}
                  onChange={() => setFormValue(opt)}
                />
              }
              label={opt}
            />
          ))}
        </GenderOptions>
      );
    }

    if (field === "birthday") {
      const years = Array.from(
        { length: 100 },
        (_, i) => today.getFullYear() - i
      );
      const months = Array.from({ length: 12 }, (_, i) => i + 1);
      const days = Array.from({ length: 31 }, (_, i) => i + 1);
      return (
        <FieldGroup>
          <FormControl fullWidth>
            <InputLabel>年份</InputLabel>
            <Select
              value={birthday.year}
              onChange={e =>
                setBirthday(prev => ({ ...prev, year: e.target.value }))
              }
            >
              {years.map(y => (
                <MenuItem key={y} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>月份</InputLabel>
            <Select
              value={birthday.month}
              onChange={e =>
                setBirthday(prev => ({ ...prev, month: e.target.value }))
              }
            >
              {months.map(m => (
                <MenuItem key={m} value={m.toString().padStart(2, "0")}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>日期</InputLabel>
            <Select
              value={birthday.day}
              onChange={e =>
                setBirthday(prev => ({ ...prev, day: e.target.value }))
              }
            >
              {days.map(d => (
                <MenuItem key={d} value={d.toString().padStart(2, "0")}>
                  {d}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FieldGroup>
      );
    }

    if (field === "password") {
      return (
        <FieldGroup>
          <TextField
            label="当前密码"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="新密码"
            type="password"
            fullWidth
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <TextField
            label="确认新密码"
            type="password"
            fullWidth
            value={newConfirmPassword}
            onChange={e => setNewConfirmPassword(e.target.value)}
          />
          {passwordError && (
            <p style={{ color: "red", marginTop: "0.5rem" }}>{passwordError}</p>
          )}
        </FieldGroup>
      );
    }

    return <div>未知字段类型</div>;
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Title>修改{label}</Title>
        {renderField()}
        <ActionButtons>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            取消
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isPending || isChangingPwd}
          >
            保存
          </Button>
        </ActionButtons>
      </FormWrapper>
    </PageWrapper>
  );
}

export default UserInfoEditor;
