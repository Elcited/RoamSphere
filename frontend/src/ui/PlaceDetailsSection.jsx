import { forwardRef, useMemo } from "react";
import styled from "styled-components";
import CategoryIcon from "@mui/icons-material/Category";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DialpadIcon from "@mui/icons-material/Dialpad";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExpandableDetailItem from "./ExpandableDetailItem";
import useSelectedPlaceDetail from "../features/search/useSelectedPlaceDetail";

const Section = styled.div`
  margin-bottom: 0rem;
`;

const DetailWrapper = styled.div`
  padding: 0.6rem 1.2rem;
  border-bottom: 1px solid #eee;
`;

const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  color: #666;
  font-size: 1.2rem;
`;

const DetailListItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;
  padding: 0 1.2rem;
`;

const DetailListItemIcon = styled.div`
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;

const DetailListItemText = styled.div`
  padding: 0.3rem;
  display: flex;
  flex: 1;
  gap: 2.4rem;
`;

const PlaceDetailsSection = forwardRef((props, ref) => {
  const selectedItem = useSelectedPlaceDetail();
  const { address, business, type } = selectedItem || {};

  const {
    business_area: businessArea,
    opentime_today: openTimeToday,
    opentime_week: openTimeWeek,
    keytag,
    tel,
  } = business || {};

  const detailListConfigs = useMemo(
    () => [
      {
        label: "地址",
        type: "address",
        value: address,
        element: <LocationOnIcon sx={{ color: "#1976d2" }} fontSize="large" />,
      },
      {
        label: "营业时间",
        type: "accessTime",
        value:
          openTimeToday && openTimeWeek
            ? [openTimeToday, openTimeWeek]
            : "营业时间未提供",
        element: <AccessTimeIcon sx={{ color: "#1976d2" }} fontSize="large" />,
      },
      {
        label: "类型",
        type: "category",
        value: type,
        element: <CategoryIcon sx={{ color: "#1976d2" }} fontSize="large" />,
      },
      {
        label: "联系电话",
        type: "contactNumber",
        value: tel || "联系电话未提供",
        element: <LocalPhoneIcon sx={{ color: "#1976d2" }} fontSize="large" />,
      },
      {
        label: "地区",
        type: "district",
        value: businessArea,
        element: <DialpadIcon sx={{ color: "#1976d2" }} fontSize="large" />,
      },
    ],
    [address, openTimeToday, openTimeWeek, keytag, tel, businessArea]
  );

  return (
    <Section ref={ref}>
      <DetailWrapper>
        <DetailList>
          {detailListConfigs.map(detailItem => {
            if (detailItem.type === "accessTime") {
              const [today, week] = Array.isArray(detailItem.value)
                ? detailItem.value
                : [detailItem.value];

              return (
                <ExpandableDetailItem
                  key={detailItem.type}
                  icon={detailItem.element}
                  type="accessTime"
                  label={today}
                  extra={week !== today ? `每周时间：${week}` : null}
                />
              );
            }

            if (detailItem.type === "contactNumber") {
              const numbers =
                typeof detailItem.value === "string"
                  ? detailItem.value.split(";")
                  : [];
              const main = numbers[0];
              const rest = numbers.slice(1).join("、");
              return (
                <ExpandableDetailItem
                  key={detailItem.type}
                  icon={detailItem.element}
                  type="contactNumber"
                  label={main}
                  extra={rest || null}
                />
              );
            }

            return (
              <DetailListItem key={detailItem.type}>
                <DetailListItemIcon>{detailItem.element}</DetailListItemIcon>
                <DetailListItemText>{detailItem.value}</DetailListItemText>
              </DetailListItem>
            );
          })}
        </DetailList>
      </DetailWrapper>
    </Section>
  );
});

export default PlaceDetailsSection;
