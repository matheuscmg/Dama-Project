import {
  Card,
  CardIcon,
  CardTitle,
  CardValue,
  CardChange,
  CardSection,
} from "../StyledComponents/Dash.style";
import { WiDirectionUp } from "react-icons/wi";

const DashboardCard = ({ title, value, icon, color, change, since }) => {
  const isPositive = !String(change).startsWith("-");

  return (
    <Card>
      <CardSection>
        <CardTitle>{title}</CardTitle>
        <CardValue>{value}</CardValue>
        <CardChange isPositive={isPositive}>
          <p className="icon">
            <span>
              <WiDirectionUp />
              {change}
            </span>{" "}
            {since}
          </p>
        </CardChange>
      </CardSection>
      <CardIcon color={color}>
        {icon}
      </CardIcon>
    </Card>
  );
};

export default DashboardCard;
