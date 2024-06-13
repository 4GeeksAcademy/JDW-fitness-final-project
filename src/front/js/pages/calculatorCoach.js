import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const CalculatorCoach = () => {
    const { store, actions } = useContext(Context);
    const [pricePerSession, setPricePerSession] = useState(null);
    const [sessionsPerWeek, setSessionsPerWeek] = useState(null);
    const [percentage, setPercentage] = useState(null);
    const [weeklyEarnings, setWeeklyEarnings] = useState(null);
    const [monthlyEarnings, setMonthlyEarnings] = useState(null);
    const [weeklyEarningsVoucher, setWeeklyEarningsVoucher] = useState(null);
    const [monthlyEarningsVoucher, setMonthlyEarningsVoucher] = useState(null);
    const [currency, setCurrency] = useState("€");
    const [errorCalculator, setErrorCalculator] = useState(false)

    const calculator = (e) => {
        e.preventDefault();
        if(!pricePerSession || !sessionsPerWeek || !percentage ) {
            setErrorCalculator(true)
            } else {
            setErrorCalculator(false)
            const calculateWeekly = (pricePerSession * sessionsPerWeek).toFixed(2);
            const calculateWeeklyVoucher = (pricePerSession * percentage * 0.01 * sessionsPerWeek).toFixed(2);
            const calculateMonthly = (calculateWeekly * 4).toFixed(2);
            const calculateMonthlyVoucher = (calculateWeeklyVoucher * 4).toFixed(2);
            setWeeklyEarnings(calculateWeekly)
            setWeeklyEarningsVoucher(calculateWeeklyVoucher)
            setMonthlyEarnings(calculateMonthly)
            setMonthlyEarningsVoucher(calculateMonthlyVoucher)
        }
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.textContent);
    };

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title fw-semibold ps-0">Calculate your earnings per client</h5>
                        </div>
                        <div className="card-body">
                            <div className="basic-form">
                                <form onSubmit={calculator}>
                                    <div className="row">
                                    <div className="form-group col-12 mb-3">
                                        <label>Price per session</label>
                                        <div className="input-group mb-3">
                                            <button className="btn btn-outline-secondary custom-dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {currency}
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end custom-dropdown-menu">
                                                <li><a className="dropdown-item custom-dropdown-item" href="#" onClick={handleCurrencyChange}>€</a></li>
                                                <li><a className="dropdown-item custom-dropdown-item" href="#" onClick={handleCurrencyChange}>$</a></li>
                                                <li><a className="dropdown-item custom-dropdown-item" href="#" onClick={handleCurrencyChange}>£</a></li>
                                            </ul>
                                            <input 
                                                type="float" 
                                                className="form-control py-3" 
                                                placeholder="25"
                                                onChange={(e) => setPricePerSession(e.target.value)}
                                            />
                                            <span className="input-group-text custom-input-group-text">00.00</span>
                                        </div>
                                    </div>
                                        <div className="form-group col-12 mb-3">
                                            <label>Sessions per week</label>
                                            <div className="input-group input-primary mb-3">
                                                <input 
                                                type="number" 
                                                className="form-control py-3" 
                                                placeholder="3"
                                                onChange={(e) => setSessionsPerWeek(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group col-12 mb-3">
                                            <label>Percentage of earnings with a voucher</label>
                                            <div className="input-group input-primary mb-3">
                                                <input 
                                                type="number" 
                                                className="form-control py-3" 
                                                placeholder="85"
                                                onChange={(e) => setPercentage(e.target.value)}
                                                />
                                                <span className="input-group-text">%</span>
                                            </div>
                                        </div>
                                    </div>
                                    {errorCalculator &&                 
                                            <div className="alert alert-danger alert-dismissible fade show text-center fw-semibold mb-4" role="alert">
                                                Please, fill all fields to use the calculator
                                            </div>
                                        }
                                    <div className="d-flex justify-content-center align-items-center mt-2">
                                        <button
                                            type="submit"
                                            className="btn btn-secondary btn-request light btn-block fw-bolder p-3">
                                            Calculate
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                    {( weeklyEarnings && monthlyEarnings && weeklyEarningsVoucher && monthlyEarningsVoucher) &&
                    <div className="row justify-content-center">
                    <div className="col-lg-6 col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Earnings according to your calculations</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="fw-semibold">Earnings per week</td>
                                                <td>{weeklyEarnings} {currency}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">Earnings per week with a voucher</td>
                                                <td>{weeklyEarningsVoucher} {currency}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">Earnings per month</td>
                                                <td>{monthlyEarnings} {currency}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">Earnings per month with a voucher</td>
                                                <td>{monthlyEarningsVoucher} {currency}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>     
                    <div className="col-lg-6 col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Average earnings according to statistics</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="fw-semibold">Earnings per week</td>
                                                <td>105 {currency}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">Earnings per week with a voucher</td>
                                                <td>90 {currency}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">Earnings per month</td>
                                                <td>420 {currency}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-semibold">Earnings per month with a voucher</td>
                                                <td>360 {currency}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                } 
            </div>
    );
};
