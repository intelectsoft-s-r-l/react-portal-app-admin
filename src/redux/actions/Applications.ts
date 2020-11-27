import { message } from "antd";
import { AdminApi } from "../../api";
import { DONE } from "../../constants/Messages";
import { SET_APPS } from "../constants/Applications";
import { hideLoading, showLoading } from "./Auth";

const setApps = (payload) => ({
    type: SET_APPS,
    payload,
});

export const getMarketApps = () => async (dispatch) => {
    dispatch(showLoading());
    return new AdminApi().GetMarketAppList().then((data: any) => {
        dispatch(hideLoading());
        if (data) {
            const { ErrorCode, ErrorMessage, MarketAppList } = data;
            if (ErrorCode === 0) dispatch(setApps(MarketAppList));
        }
    });
};
export const updateMarketApp = (App) => async (dispatch) => {
    return new AdminApi().UpdateMarketApp(App).then((data: any) => {
        if (data) {
            if (data.ErrorCode === 0) dispatch(getMarketApps());
        }
    });
};

export const createMarketAppPackage = (middlewareData, MarketAppID) => async (
    dispatch
) => {
    dispatch(showLoading());
    return new AdminApi()
        .CreateMarketAppPackage(middlewareData, MarketAppID)
        .then(async (data: any) => {
            dispatch(hideLoading());
            if (data) {
                if (data.ErrorCode === 0) await dispatch(getMarketApps());
            }
        });
};
export const updateMarketAppPackage = (AppPackage) => async (dispatch) => {
    dispatch(showLoading());
    return new AdminApi()
        .UpdateMarketAppPackage(AppPackage)
        .then(async (data: any) => {
            dispatch(hideLoading());
            if (data) {
                if (data.ErrorCode === 0) await dispatch(getMarketApps());
            }
        });
};

export const deleteMarketAppPackage = (ID) => async (dispatch) => {
    dispatch(showLoading());
    return new AdminApi().DeleteMarketAppPackage(ID).then(async (data: any) => {
        dispatch(hideLoading());
        if (data) {
            if (data.ErrorCode === 0) await dispatch(getMarketApps());
        }
    });
};

export const changeMarketAppStatus = (AppID, Status) => async (dispatch) => {
    dispatch(showLoading());
    setTimeout(() => {
        dispatch(hideLoading());
        return new AdminApi()
            .ChangeMarketAppStatus(AppID, Status)
            .then((data: any) => {
                if (data) {
                    if (data.ErrorCode === 0) message.success(DONE, 1);
                }
            });
    }, 1000);
};
