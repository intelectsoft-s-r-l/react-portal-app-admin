import * as React from "react";
import { Col, Row } from "antd";
import { EnErrorCode } from "../../../api";
import { MailService } from "../../../api/mail";
import { Result, Button } from "antd";
import { useState, useEffect } from "react";
import { TemplatesType } from "../../../api/mail/types";
import TemplateCard from "./TemplateCard";
import { Link, RouteComponentProps } from "react-router-dom";
import { ROW_GUTTER } from "../../../constants/ThemeConstant";
import Loading from "../../../components/shared-components/Loading";

/* Show templates as cards/table ?
 * Show image inside cards ?
 * Table: Name, State = (Draft, Sending, Scheduled)
 */
const TemplateList = (props: RouteComponentProps) => {
  const { match, history, location } = props;
  const [templates, setTemplates] = useState<TemplatesType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    new MailService().GetTemplates().then((data) => {
      setLoading(false);
      if (data && data.ErrorCode === EnErrorCode.NO_ERROR) {
        setTemplates(data.Templates);
      }
    });
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (templates.length === 0) {
    return (
      <Result
        status={404}
        title="There are no templates just yet"
        subTitle="But you can create a new one!"
        extra={
          <Link to={`${match.url}/select`}>
            <Button type="primary">Add a template</Button>
          </Link>
        }
      />
    );
  }
  return (
    <Row gutter={ROW_GUTTER} className="mt-3">
      {templates.map((temp) => (
        <Col xs={8} md={12} lg={8} xxl={6}>
          <TemplateCard {...temp} />
        </Col>
      ))}
    </Row>
  );
};
export default TemplateList;
