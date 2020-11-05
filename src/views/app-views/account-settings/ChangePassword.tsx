import React, { Component } from "react";
import { Form, Button, Input, Row, Col, message } from "antd";
import IntlMessage from "../../../components/util-components/IntlMessage";
import { connect } from "react-redux";
import Utils from "../../../utils";
import {
    API_IS_AUTH_SERVICE,
    API_PUBLIC_KEY,
} from "../../../constants/ApiConstant";
import axios from "axios";
import AppLocale from "../../../lang";
import { DONE, EXPIRE_TIME } from "../../../constants/Messages";
import { signOut } from "../../../redux/actions/Auth";

export class ChangePassword extends Component {
    private changePasswordFormRef = React.createRef<any>();
    state = {
        loading: false,
    };

    onFinish = ({ currentPassword, newPassword }) => {
        console.log({
            NewPassword: Utils.encryptInput(newPassword, API_PUBLIC_KEY),
            OldPassword: Utils.encryptInput(currentPassword, API_PUBLIC_KEY),
            Token: this.props["token"],
        });
        const currentAppLocale = AppLocale[this.props["locale"]];
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false });
            axios
                .post(`${API_IS_AUTH_SERVICE}/ChangePassword`, {
                    NewPassword: Utils.encryptInput(
                        newPassword,
                        API_PUBLIC_KEY
                    ),
                    OldPassword: Utils.encryptInput(
                        currentPassword,
                        API_PUBLIC_KEY
                    ),
                    Token: this.props["token"],
                })
                .then((res) => {
                    const { errorCode, errorMessage } = res.data;
                    if (errorCode === 0) {
                        message.success(DONE, 1.5);
                    } else if (errorCode === 118) {
                        /* Token expired */
                        message.loading(EXPIRE_TIME, 1.5).then(() => signOut());
                    } else {
                        /* Incorrect old password */
                        message.error(errorMessage, 2);
                    }
                });
        }, 1500);
        this.onReset();
    };
    onReset = () => {
        this.changePasswordFormRef.current!.resetFields();
    };

    render() {
        return (
            <>
                <h2 className="mb-4">
                    <IntlMessage id={"account.ChangePassword.Title"} />
                </h2>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={8}>
                        <Form
                            name="changePasswordForm"
                            layout="vertical"
                            ref={this.changePasswordFormRef}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                label={
                                    <IntlMessage
                                        id={
                                            "account.ChangePassword.CurrentPassword"
                                        }
                                    />
                                }
                                name="currentPassword"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please enter your currrent password!",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <IntlMessage
                                        id={
                                            "account.ChangePassword.NewPassword"
                                        }
                                    />
                                }
                                name="newPassword"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please enter your new password!",
                                    },
                                    {
                                        required: true,
                                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+,.\\\/;':"-]).{8,}$/,
                                        message:
                                            "Password should contain at least 8 characters, 1 capital letter and 1 special symbol!",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label={
                                    <IntlMessage
                                        id={
                                            "account.ChangePassword.ConfirmPassword"
                                        }
                                    />
                                }
                                name="confirmPassword"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please confirm your password!",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (
                                                !value ||
                                                getFieldValue("newPassword") ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                "Password not matched!"
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={this.state.loading}
                            >
                                {" "}
                                {this.state.loading ? (
                                    <IntlMessage
                                        id={
                                            "account.ChangePassword.ChangePasswordProcess"
                                        }
                                    />
                                ) : (
                                    <IntlMessage
                                        id={
                                            "account.ChangePassword.ChangePassword"
                                        }
                                    />
                                )}
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = ({ auth, theme }) => {
    const { token } = auth;
    const { locale } = theme;
    return { token, locale };
};
export default connect(mapStateToProps, null)(ChangePassword);
