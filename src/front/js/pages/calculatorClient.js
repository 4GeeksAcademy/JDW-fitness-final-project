import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const CalculatorClient = () => {
    const { store, actions } = useContext(Context);
    const [age, setAge] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [gender, setGender] = useState(null);
    const [BMI, setBMI] = useState(null);
    const [percentageFat, setPercentageFat] = useState(null);
    const [BMR, setBMR] = useState(null);
    const loggedClient = JSON.parse(localStorage.getItem("loggedClient"));
    const [errorCalculator, setErrorCalculator] = useState(false)

    const calculator = (e) => {
        e.preventDefault();
        if(!age || !gender || !height || !weight) {
            setErrorCalculator(true)
            } else {
            setErrorCalculator(false)
            const calculatedBMI = calculationBMI(height, weight).toFixed(2);
            const calculatedFat = calculationFat(calculatedBMI, gender, age).toFixed(2);
            const calculatedBMR = Math.round(calculationBMR(age, height, weight, gender));
            setBMI(calculatedBMI)
            setPercentageFat(calculatedFat)
            setBMR(calculatedBMR)
            updateClient(calculatedBMI, calculatedFat, calculatedBMR);
        }
    };

    const updateClient = async (calculatedBMI, calculatedFat, calculatedBMR) => {
        if (loggedClient && loggedClient.id) {
            await actions.updateClientAPICalculator(
                age,
                height,
                weight,
                gender,
                calculatedBMI,
                calculatedFat,
                calculatedBMR,
                loggedClient.id
            );
        }
    };

    const calculationBMI = (height, weight) => {
        const heightInMeters = height / 100;
        return weight / (heightInMeters * heightInMeters);
    };

    const calculationFat = (BMI, gender, age) => {
        let resultFat = null;
        if (gender === "male") {
            resultFat = 1.2 * BMI + 0.23 * age - 10.8 - 5.4;
        } else if (gender === "female") {
            resultFat = 1.2 * BMI + 0.23 * age - 5.4;
        }
        return resultFat;
    };

    const calculationBMR = (age, height, weight, gender) => {
        let resultBMR = null;
        if (gender === "male") {
            resultBMR = 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (gender === "female") {
            resultBMR = 10 * weight + 6.25 * height - 5 * age - 161;
        }
        return resultBMR;
    };

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title fw-semibold ps-0">Calculate your BMI, your % fat and your BMR</h5>
                        </div>
                        <div className="card-body">
                            <div className="basic-form">
                                <form onSubmit={calculator}>
                                    <div className="row">
                                        <div className="mb-4 position-relative">
                                            <label className="mb-3 form-label">Gender</label>
                                            <div className="basic-form">
                                                <div className="form-group mb-0">
                                                    <div className="form-check d-inline-block me-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gender"
                                                            id="male"
                                                            value="male"
                                                            checked={gender === "male"}
                                                            onChange={(e) => setGender(e.target.value)}
                                                        />
                                                        <label className="form-check-label" htmlFor="male">
                                                            Male
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-inline-block mx-4">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gender"
                                                            id="female"
                                                            value="female"
                                                            checked={gender === "female"}
                                                            onChange={(e) => setGender(e.target.value)}
                                                        />
                                                        <label className="form-check-label" htmlFor="female">
                                                            Female
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group col-12 mb-3">
                                            <label>Age</label>
                                            <div className="input-group input-primary mb-3">
                                                <input 
                                                type="number" 
                                                className="form-control py-3" 
                                                placeholder="30"
                                                value={age || ""}
                                                onChange={(e) => setAge(e.target.value)}
                                                />
                                                <span className="input-group-text">years</span>
                                            </div>
                                        </div>
                                        <div className="form-group col-12 mb-3">
                                            <label>Height</label>
                                            <div className="input-group input-primary mb-3">
                                                <input 
                                                type="number" 
                                                className="form-control py-3" 
                                                placeholder="180"
                                                value={height || ""}
                                                onChange={(e) => setHeight(e.target.value)}
                                                />
                                                <span className="input-group-text">cm</span>
                                            </div>
                                        </div>
                                        <div className="form-group col-12 mb-3">
                                            <label>Weight</label>
                                            <div className="input-group input-primary mb-3">
                                                <input 
                                                type="float" 
                                                className="form-control py-3" 
                                                placeholder="80"
                                                value={weight || ""}
                                                onChange={(e) => setWeight(e.target.value)}
                                                />
                                                <span className="input-group-text">kg</span>
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
                    {(BMI && percentageFat && BMR) &&
                    <div className="row justify-content-center">
                    <div className="col-xl-4 col-lg-6 col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Your BMI is {BMI}</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="thead-info">
                                            <tr>
                                                <th scope="col">BMI</th>
                                                <th scope="col">Category</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Less than 18.5</td>
                                                <td>Underweight</td>
                                            </tr>
                                            <tr>
                                                <td>18.5 - 24.9</td>
                                                <td>Normal range</td>
                                            </tr>
                                            <tr>
                                                <td>25 - 29.9</td>
                                                <td>Overweight</td>
                                            </tr>
                                            <tr>
                                                <td>More than 30</td>
                                                <td>Obese</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>     
                    <div className="col-xl-4 col-lg-6 col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Your % Fat is {percentageFat}</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="thead-info">
                                            <tr>
                                                <th scope="col">Description</th>
                                                <th scope="col">Women</th>
                                                <th scope="col">Men</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Essential fat</td>
                                                <td>10-13%</td>
                                                <td>2-5%</td>
                                            </tr>
                                            <tr>
                                                <td>Athletes</td>
                                                <td>14-20%</td>
                                                <td>6-13%</td>
                                            </tr>
                                            <tr>
                                                <td>Fitness</td>
                                                <td>21-24%</td>
                                                <td>14-17%</td>
                                            </tr>
                                            <tr>
                                                <td>Average</td>
                                                <td>25-31%</td>
                                                <td>18-24%</td>
                                            </tr>
                                            <tr>
                                                <td>Obese</td>
                                                <td>More than 32%</td>
                                                <td>More than 25%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-6 col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Your BMR is {BMR} KCal/Day</h4>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="thead-info">
                                            <tr>
                                                <th scope="col">Activity level</th>
                                                <th scope="col">Calories</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Little/no exercise</td>
                                                <td>{Math.round(BMR * 1.2)}</td>
                                            </tr>
                                            <tr>
                                                <td>Light exercise</td>
                                                <td>{Math.round(BMR * 1.375)}</td>
                                            </tr>
                                            <tr>
                                                <td>Moderate exercise (3-5 days/week)</td>
                                                <td>{Math.round(BMR * 1.55)}</td>
                                            </tr>
                                            <tr>
                                                <td>Very active (6-7 days/week)</td>
                                                <td>{Math.round(BMR * 1.725)}</td>
                                            </tr>
                                            <tr>
                                                <td>Extra active (very active & physical job)</td>
                                                <td>{Math.round(BMR * 1.9)}</td>
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
