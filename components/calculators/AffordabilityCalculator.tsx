"use client";

import { useState, useEffect, useRef } from "react";
import { Calculator, DollarSign, TrendingUp, AlertCircle, CheckCircle, XCircle, Info, RefreshCw } from "lucide-react";

interface AffordabilityInputs {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTaxRate: number;
  creditScore: string;
}

interface AffordabilityResults {
  maxHomePrice: number;
  estimatedMonthlyPayment: number;
  requiredDownPayment: number;
  dtiRatio: number;
  recommendedDownPayment: number;
  maxLoanAmount: number;
}

export default function AffordabilityCalculator() {
  const defaultInputs: AffordabilityInputs = {
    annualIncome: 75000,
    monthlyDebts: 500,
    downPayment: 70000,
    interestRate: 7.0,
    loanTerm: 30,
    propertyTaxRate: 1.2,
    creditScore: "740-799",
  };

  const [inputs, setInputs] = useState<AffordabilityInputs>(defaultInputs);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const [results, setResults] = useState<AffordabilityResults>({
    maxHomePrice: 0,
    estimatedMonthlyPayment: 0,
    requiredDownPayment: 0,
    dtiRatio: 0,
    recommendedDownPayment: 0,
    maxLoanAmount: 0,
  });

  useEffect(() => {
    calculateAffordability();
  }, [inputs]);

  const calculateAffordability = () => {
    const { annualIncome, monthlyDebts, downPayment, interestRate, loanTerm, propertyTaxRate } = inputs;

    const monthlyIncome = annualIncome / 12;
    const maxDTIRatio = 0.43;
    const maxHousingPayment = (monthlyIncome * maxDTIRatio) - monthlyDebts;

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const insuranceRate = 0.005 / 12;
    const taxAndInsuranceRate = (propertyTaxRate / 100 / 12) + insuranceRate;

    let maxHomePrice = 0;
    if (monthlyRate > 0) {
      const piRate = (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

      let testPrice = 100000;
      let step = 50000;

      for (let i = 0; i < 50; i++) {
        const loanAmount = testPrice - downPayment;
        const pi = loanAmount * piRate;
        const ti = testPrice * taxAndInsuranceRate;
        const totalPayment = pi + ti;

        if (totalPayment < maxHousingPayment) {
          testPrice += step;
        } else {
          testPrice -= step;
        }
        step = step / 2;
      }

      maxHomePrice = Math.floor(testPrice / 1000) * 1000;
    }

    const maxLoanAmount = maxHomePrice - downPayment;
    const monthlyPI = monthlyRate === 0
      ? maxLoanAmount / numberOfPayments
      : (maxLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const monthlyTI = maxHomePrice * taxAndInsuranceRate;
    const estimatedMonthlyPayment = monthlyPI + monthlyTI;

    const dtiRatio = ((estimatedMonthlyPayment + monthlyDebts) / monthlyIncome) * 100;
    const recommendedDownPayment = maxHomePrice * 0.20;

    setResults({
      maxHomePrice,
      estimatedMonthlyPayment,
      requiredDownPayment: downPayment,
      dtiRatio,
      recommendedDownPayment,
      maxLoanAmount,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleReset = () => {
    setInputs(defaultInputs);
  };

  const tooltips: { [key: string]: string } = {
    annualIncome: "Your total household gross income before taxes. Include all sources of income.",
    monthlyDebts: "Total monthly debt payments including car loans, credit cards, student loans, etc. Do not include utilities or rent.",
    downPayment: "The amount you have saved for a down payment. More is better to avoid PMI.",
    interestRate: "Current mortgage interest rates in your area. Check with local lenders for accurate rates.",
    loanTerm: "The length of the mortgage loan. 30 years is most common, but 15 years saves on interest.",
    propertyTaxRate: "Your area's annual property tax rate as a percentage of home value. Contact your county assessor for local rates.",
    creditScore: "Your FICO credit score range. Higher scores qualify for better interest rates."
  };

  const Tooltip = ({ text, id }: { text: string; id: string }) => (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setShowTooltip(id)}
        onMouseLeave={() => setShowTooltip(null)}
        onClick={() => setShowTooltip(showTooltip === id ? null : id)}
        className="ml-1 text-gray-400 hover:text-[#3b82f6] transition-colors"
      >
        <Info className="w-4 h-4" />
      </button>
      {showTooltip === id && (
        <div className="absolute z-50 left-0 top-6 w-64 p-3 bg-[#21266c] text-white text-xs rounded-lg shadow-xl">
          <div className="absolute -top-1 left-4 w-2 h-2 bg-[#21266c] transform rotate-45"></div>
          {text}
        </div>
      )}
    </div>
  );

  const getDTIStatus = () => {
    if (results.dtiRatio <= 36) {
      return { color: "green", icon: CheckCircle, text: "Excellent", description: "Your DTI is in a healthy range" };
    } else if (results.dtiRatio <= 43) {
      return { color: "yellow", icon: AlertCircle, text: "Good", description: "Within acceptable range for most lenders" };
    } else {
      return { color: "red", icon: XCircle, text: "High", description: "May be difficult to qualify for a loan" };
    }
  };

  const dtiStatus = getDTIStatus();

  const InputField = ({
    label,
    value,
    onChange,
    icon: Icon,
    type = "number",
    prefix = "",
    suffix = "",
    step = "1",
    min = "0",
    tooltipId
  }: any) => {
    const [localValue, setLocalValue] = useState(value);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setLocalValue(val);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const parsed = parseFloat(val);
        onChange(isNaN(parsed) ? 0 : parsed);
      }, 300);
    };

    return (
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          {label}
          {tooltipId && <Tooltip text={tooltips[tooltipId] ?? ''} id={tooltipId} />}
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon className="w-5 h-5" />
          </div>
          {prefix && (
            <span className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-600 font-medium">
              {prefix}
            </span>
          )}
          <input
            type={type}
            value={localValue}
            onChange={handleChange}
            step={step}
            min={min}
            className={`w-full ${prefix ? 'pl-14' : 'pl-11'} ${suffix ? 'pr-12' : 'pr-4'} py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all hover:border-gray-300`}
          />
          {suffix && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">
              {suffix}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#21266c] flex items-center gap-3">
          <Calculator className="w-7 h-7 text-[#21266c]" />
          Home Affordability Calculator
        </h2>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-300 rounded-lg font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <InputField
            label="Annual Household Income"
            value={inputs.annualIncome}
            onChange={(val: number) => setInputs({ ...inputs, annualIncome: val })}
            icon={DollarSign}
            prefix="$"
            step="1000"
            tooltipId="annualIncome"
          />

          <InputField
            label="Monthly Debt Payments"
            value={inputs.monthlyDebts}
            onChange={(val: number) => setInputs({ ...inputs, monthlyDebts: val })}
            icon={TrendingUp}
            prefix="$"
            step="50"
            tooltipId="monthlyDebts"
          />

          <InputField
            label="Down Payment Saved"
            value={inputs.downPayment}
            onChange={(val: number) => setInputs({ ...inputs, downPayment: val })}
            icon={DollarSign}
            prefix="$"
            step="1000"
            tooltipId="downPayment"
          />

          <InputField
            label="Interest Rate"
            value={inputs.interestRate}
            onChange={(val: number) => setInputs({ ...inputs, interestRate: val })}
            icon={TrendingUp}
            suffix="%"
            step="0.1"
            tooltipId="interestRate"
          />

          <InputField
            label="Loan Term"
            value={inputs.loanTerm}
            onChange={(val: number) => setInputs({ ...inputs, loanTerm: val })}
            icon={TrendingUp}
            suffix="years"
            tooltipId="loanTerm"
          />

          <InputField
            label="Property Tax Rate"
            value={inputs.propertyTaxRate}
            onChange={(val: number) => setInputs({ ...inputs, propertyTaxRate: val })}
            icon={TrendingUp}
            suffix="%"
            step="0.1"
            tooltipId="propertyTaxRate"
          />

          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              Credit Score Range
              <Tooltip text={tooltips.creditScore ?? ''} id="creditScore" />
            </label>
            <select
              value={inputs.creditScore}
              onChange={(e) => setInputs({ ...inputs, creditScore: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] cursor-pointer"
            >
              <option value="800+">Excellent (800+)</option>
              <option value="740-799">Very Good (740-799)</option>
              <option value="670-739">Good (670-739)</option>
              <option value="580-669">Fair (580-669)</option>
              <option value="Below 580">Poor (Below 580)</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Maximum Home Price */}
          <div className="bg-gradient-to-br from-[#21266c]/10 to-blue-50 border-2 border-[#21266c] rounded-lg p-6">
            <h3 className="text-lg font-bold text-[#21266c] mb-4">Maximum Home Price</h3>
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-2">You Can Afford</p>
              <p className="text-4xl sm:text-5xl font-bold text-[#21266c]">{formatCurrency(results.maxHomePrice)}</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Loan Amount</span>
                <span className="font-semibold text-gray-900">{formatCurrency(results.maxLoanAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Down Payment</span>
                <span className="font-semibold text-gray-900">{formatCurrency(results.requiredDownPayment)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Est. Monthly Payment</span>
                <span className="font-semibold text-gray-900">{formatCurrency(results.estimatedMonthlyPayment)}</span>
              </div>
            </div>
          </div>

          {/* DTI Ratio */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Debt-to-Income (DTI) Ratio</h4>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <dtiStatus.icon className={`w-6 h-6 text-${dtiStatus.color}-500`} />
                <div>
                  <p className="text-2xl font-bold text-[#21266c]">{results.dtiRatio.toFixed(1)}%</p>
                  <p className={`text-xs text-${dtiStatus.color}-600 font-semibold`}>{dtiStatus.text}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{dtiStatus.description}</p>

            {/* DTI Indicator */}
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-green-500" />
                <div className="flex-1 bg-yellow-500" />
                <div className="flex-1 bg-red-500" />
              </div>
              <div
                className="absolute top-0 h-full w-1 bg-[#21266c] shadow-lg"
                style={{ left: `${Math.min(results.dtiRatio / 60 * 100, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0%</span>
              <span>36%</span>
              <span>43%</span>
              <span>60%</span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-[#21266c] mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Recommendations
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              {results.requiredDownPayment < results.recommendedDownPayment && (
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Consider saving {formatCurrency(results.recommendedDownPayment)} (20%) to avoid PMI and lower your monthly payment.
                  </span>
                </li>
              )}
              {results.dtiRatio > 36 && (
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Your DTI is above 36%. Consider paying down existing debts to improve your buying power.
                  </span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>
                  Get pre-approved to know your exact buying power and strengthen your offers.
                </span>
              </li>
              {inputs.creditScore !== "800+" && (
                <li className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                  <span>
                    Improving your credit score could qualify you for better interest rates and lower payments.
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Monthly Income</p>
              <p className="text-lg font-bold text-[#21266c]">{formatCurrency(inputs.annualIncome / 12)}</p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Monthly Debts</p>
              <p className="text-lg font-bold text-[#21266c]">{formatCurrency(inputs.monthlyDebts)}</p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Max Housing Payment</p>
              <p className="text-lg font-bold text-[#21266c]">{formatCurrency(results.estimatedMonthlyPayment)}</p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Recommended 20% Down</p>
              <p className="text-lg font-bold text-[#21266c]">{formatCurrency(results.recommendedDownPayment)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
