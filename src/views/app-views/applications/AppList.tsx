import React, { lazy, useState } from "react";
import PageHeaderAlt from "../../../components/layout-components/PageHeaderAlt";
import {
    Radio,
    Button,
    Row,
    Col,
    Tooltip,
    Tag,
    Progress,
    Avatar,
    Menu,
    Card,
} from "antd";
import {
    AppstoreOutlined,
    UnorderedListOutlined,
    ExperimentOutlined,
    PlusOutlined,
    PaperClipOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    EyeOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import utils from "../../../utils";
import { COLORS } from "../../../constants/ChartConstant";
import Flex from "../../../components/shared-components/Flex";
import EllipsisDropdown from "../../../components/shared-components/EllipsisDropdown";
import EditAppForm from "./EditAppForm";
import { Link, NavLink, Route } from "react-router-dom";
import { APP_PREFIX_PATH } from "../../../configs/AppConfig";

const ItemAction = ({ data, id, removeId, showEditAppModal }) => (
    <EllipsisDropdown
        menu={
            <Menu>
                <Menu.Item key="1">
                    <Link to={`${APP_PREFIX_PATH}/applications/${data.ID}`}>
                        <EyeOutlined />
                        <span> View</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" onClick={() => showEditAppModal(data)}>
                    <EditOutlined />
                    <span>Edit</span>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">
                    <DeleteOutlined />
                    <span>Delete</span>
                </Menu.Item>
            </Menu>
        }
    />
);

const GridItem = ({ showEditAppModal, data }) => {
    return (
        <Card>
            <Flex className="mb-3 " justifyContent="between">
                <Link to={`${APP_PREFIX_PATH}/applications/${data.ID}`}>
                    <div className="cursor-pointer">
                        <Avatar
                            src={data.Photo}
                            icon={<ExperimentOutlined />}
                            shape="square"
                            size={60}
                        />
                    </div>
                </Link>
                {data.Status === 0 ? (
                    <Tag
                        className="text-capitalize cursor-pointer"
                        color="volcano"
                    >
                        <ClockCircleOutlined />
                        <span className="ml-2 font-weight-semibold">
                            Not Active
                        </span>
                    </Tag>
                ) : (
                    <Tag className="text-capitalize" color="cyan">
                        <CheckCircleOutlined />
                        <span className="ml-2 font-weight-semibold">
                            Active
                        </span>
                    </Tag>
                )}
            </Flex>
            <div>
                <Link to={`${APP_PREFIX_PATH}/applications/${data.ID}`}>
                    <h3 className="mb-0 cursor-pointer ">{data.Name}</h3>
                </Link>
                <p className="text-muted">By IntelectSoft</p>
                <div style={{ minHeight: "70px" }}>{data.ShortDescription}</div>
            </div>
            <div>
                <Link
                    to={`${APP_PREFIX_PATH}/applications/${data.ID}`}
                    className="mr-3"
                >
                    View
                </Link>
                <Link to="#" onClick={() => showEditAppModal(data)}>
                    Edit
                </Link>
            </div>
        </Card>
    );
};
const GridItem2 = ({ data, removeId, showEditAppModal }) => (
    <Card>
        <Flex alignItems="center" justifyContent="between">
            <ItemHeader
                Status={data.Status}
                avatar={data.Photo}
                name={data.Name}
                shortDescription={
                    data.ShortDescription
                        ? data.ShortDescription
                        : "Here could be your description. Here could be your description .Here could be your description."
                }
            />
            <ItemAction
                data={data}
                id={data.ID}
                removeId={removeId}
                showEditAppModal={showEditAppModal}
            />
        </Flex>
    </Card>
);

const ItemHeader = ({ name, avatar, shortDescription, Status }) => (
    <>
        <Flex>
            <div className="mr-3">
                <Avatar
                    src={avatar}
                    icon={<ExperimentOutlined />}
                    shape="square"
                    size={80}
                />
            </div>
            <Flex flexDirection="column">
                <Flex flexDirection="row">
                    <h2 className="mr-3">{name} </h2>
                    <Tag
                        className="text-capitalize"
                        color={Status === 1 ? "cyan" : "red"}
                    >
                        {Status === 1 ? (
                            <CheckCircleOutlined />
                        ) : (
                            <ClockCircleOutlined />
                        )}
                        <span className="ml-2 font-weight-semibold">
                            {Status === 1 ? "Active" : "Not Active"}
                        </span>
                    </Tag>
                </Flex>
                <div>{shortDescription}</div>
            </Flex>
        </Flex>
    </>
);

const AppList = ({ apps, signOut }) => {
    const [selectedApp, setSelectedApp] = useState();
    const [editAppModalVisible, setEditAppModalVisible] = useState(false);

    const showEditAppModal = (selected) => {
        setSelectedApp(selected);
        setEditAppModalVisible(true);
    };

    const closeEditAppModal = () => {
        setEditAppModalVisible(false);
    };

    const deleteItem = (id) => {
        const data = apps.filter((elm) => elm["ID"] !== id);
    };

    return (
        <>
            <EditAppForm
                apps={selectedApp}
                visible={editAppModalVisible}
                close={closeEditAppModal}
                signOut={signOut}
            />
            {/* <PageHeaderAlt className="bg-white border-bottom">
                <div className="container-fluid">
                    <Flex
                        justifyContent="between"
                        alignItems="center"
                        className="py-4"
                    >
                        <h2>Applications</h2>
                    </Flex>
                </div>
            </PageHeaderAlt> */}
            <div
                className={`my-4 
                    container-fluid`}
            >
                <Row gutter={16}>
                    {apps.map((elm) => (
                        <Col
                            xs={24}
                            sm={24}
                            lg={12}
                            xl={8}
                            xxl={8}
                            key={elm["ID"]}
                        >
                            <GridItem
                                showEditAppModal={showEditAppModal}
                                data={elm}
                                key={elm["ID"]}
                            />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};

export default AppList;
