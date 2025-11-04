"use client";

import { useState, useEffect, useRef } from "react";
import { DollarSign, Home, Percent, Calendar, FileText, Printer, Info, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

interface MortgageInputs {
  homePrice: number;
  downPayment: number;
  downPaymentType: "percent" | "dollar";
  interestRate: number;
  loanTerm: number;
  propertyTax: number;
  homeInsurance: number;
  hoaFees: number;
  pmi: number;
}

interface MonthlyPayment {
  principalAndInterest: number;
  propertyTax: number;
  insurance: number;
  hoaFees: number;
  pmi: number;
  total: number;
}

export default function MortgageCalculator() {
  const defaultInputs: MortgageInputs = {
    homePrice: 0,
    downPayment: 0,
    downPaymentType: "percent",
    interestRate: 0,
    loanTerm: 30,
    propertyTax: 0,
    homeInsurance: 0,
    hoaFees: 0,
    pmi: 0,
  };

  const [inputs, setInputs] = useState<MortgageInputs>(defaultInputs);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const [payment, setPayment] = useState<MonthlyPayment>({
    principalAndInterest: 0,
    propertyTax: 0,
    insurance: 0,
    hoaFees: 0,
    pmi: 0,
    total: 0,
  });

  const [totalStats, setTotalStats] = useState({
    totalInterest: 0,
    totalPaid: 0,
    loanAmount: 0,
    downPaymentAmount: 0,
  });

  useEffect(() => {
    calculatePayment();
  }, [inputs]);

  const calculatePayment = () => {
    const { homePrice, downPayment, downPaymentType, interestRate, loanTerm, propertyTax, homeInsurance, hoaFees, pmi } = inputs;

    const downPaymentAmount = downPaymentType === "percent"
      ? (homePrice * downPayment) / 100
      : downPayment;

    const loanAmount = homePrice - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const principalAndInterest = monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const monthlyPropertyTax = propertyTax / 12;
    const monthlyInsurance = homeInsurance / 12;
    const monthlyHOA = hoaFees;
    const monthlyPMI = pmi;

    const totalMonthly = principalAndInterest + monthlyPropertyTax + monthlyInsurance + monthlyHOA + monthlyPMI;
    const totalInterest = (principalAndInterest * numberOfPayments) - loanAmount;
    const totalPaid = totalMonthly * numberOfPayments + downPaymentAmount;

    setPayment({
      principalAndInterest,
      propertyTax: monthlyPropertyTax,
      insurance: monthlyInsurance,
      hoaFees: monthlyHOA,
      pmi: monthlyPMI,
      total: totalMonthly,
    });

    setTotalStats({
      totalInterest,
      totalPaid,
      loanAmount,
      downPaymentAmount,
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

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setInputs(defaultInputs);
  };

  const tooltips: { [key: string]: string } = {
    homePrice: "The total purchase price of the home you're considering.",
    downPayment: "The upfront amount you pay. 20% down avoids PMI insurance.",
    interestRate: "The annual interest rate on your mortgage loan. Check current market rates.",
    loanTerm: "The number of years to repay the loan. Common terms are 15 or 30 years.",
    propertyTax: "Annual property taxes based on your home's assessed value and local tax rates.",
    homeInsurance: "Annual homeowner's insurance premium to protect your property.",
    hoaFees: "Monthly Homeowners Association fees if your property is in an HOA community.",
    pmi: "Private Mortgage Insurance - required if down payment is less than 20%."
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

  const DownPaymentField = () => {
    const [localValue, setLocalValue] = useState(inputs.downPayment);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
      setLocalValue(inputs.downPayment);
    }, [inputs.downPayment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setLocalValue(parseFloat(val) || 0);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const parsed = parseFloat(val);
        setInputs({ ...inputs, downPayment: isNaN(parsed) ? 0 : parsed });
      }, 300);
    };

    return (
      <div>
        <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
          Down Payment
          <Tooltip text={tooltips.downPayment ?? ''} id="downPayment" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <input
              type="number"
              value={localValue || ''}
              onChange={handleChange}
              step={inputs.downPaymentType === "percent" ? "1" : "1000"}
              min="0"
              placeholder={inputs.downPaymentType === "percent" ? "20" : "70000"}
              className="w-full pl-4 pr-12 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] hover:border-gray-300 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600">
              {inputs.downPaymentType === "percent" ? "%" : "$"}
            </span>
          </div>
          <select
            value={inputs.downPaymentType}
            onChange={(e) => setInputs({ ...inputs, downPaymentType: e.target.value as "percent" | "dollar" })}
            className="px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] cursor-pointer"
          >
            <option value="percent">Percent</option>
            <option value="dollar">Dollar Amount</option>
          </select>
        </div>
      </div>
    );
  };

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
    tooltipId,
    placeholder = ""
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
            value={localValue || ''}
            onChange={handleChange}
            step={step}
            min={min}
            placeholder={placeholder}
            className={`w-full ${prefix ? 'pl-14' : 'pl-11'} ${suffix ? 'pr-12' : 'pr-4'} py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all hover:border-gray-300`}
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
          <DollarSign className="w-7 h-7 text-[#3b82f6]" />
          Mortgage Payment Calculator
        </h2>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={handleReset}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-300"
          >
            <RefreshCw className="w-4 h-4" />
            Reset
          </Button>
          <Button
            variant="secondary"
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#21266c] text-white hover:bg-[#3b82f6]"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <InputField
            label="Home Price"
            value={inputs.homePrice}
            onChange={(val: number) => setInputs({ ...inputs, homePrice: val })}
            icon={Home}
            prefix="$"
            step="1000"
            tooltipId="homePrice"
            placeholder="350000"
          />

          <DownPaymentField />

          <InputField
            label="Interest Rate"
            value={inputs.interestRate}
            onChange={(val: number) => setInputs({ ...inputs, interestRate: val })}
            icon={Percent}
            suffix="%"
            step="0.1"
            tooltipId="interestRate"
            placeholder="7.0"
          />

          <InputField
            label="Loan Term"
            value={inputs.loanTerm}
            onChange={(val: number) => setInputs({ ...inputs, loanTerm: val })}
            icon={Calendar}
            suffix="years"
            tooltipId="loanTerm"
            placeholder="30"
          />

          <InputField
            label="Annual Property Tax"
            value={inputs.propertyTax}
            onChange={(val: number) => setInputs({ ...inputs, propertyTax: val })}
            icon={FileText}
            prefix="$"
            step="100"
            tooltipId="propertyTax"
            placeholder="4200"
          />

          <InputField
            label="Annual Home Insurance"
            value={inputs.homeInsurance}
            onChange={(val: number) => setInputs({ ...inputs, homeInsurance: val })}
            icon={FileText}
            prefix="$"
            step="100"
            tooltipId="homeInsurance"
            placeholder="1200"
          />

          <InputField
            label="Monthly HOA Fees"
            value={inputs.hoaFees}
            onChange={(val: number) => setInputs({ ...inputs, hoaFees: val })}
            icon={DollarSign}
            prefix="$"
            step="10"
            tooltipId="hoaFees"
            placeholder="0"
          />

          <InputField
            label="Monthly PMI"
            value={inputs.pmi}
            onChange={(val: number) => setInputs({ ...inputs, pmi: val })}
            icon={DollarSign}
            prefix="$"
            step="10"
            tooltipId="pmi"
            placeholder="0"
          />
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Monthly Payment Breakdown */}
          <div className="bg-gradient-to-br from-[#21266c]/10 to-blue-50 border-2 border-[#3b82f6] rounded-lg p-6">
            <h3 className="text-lg font-bold text-[#21266c] mb-4">Monthly Payment</h3>
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-2">Total Monthly Payment</p>
              <p className="text-4xl sm:text-5xl font-bold text-[#21266c]">{formatCurrency(payment.total)}</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Principal & Interest</span>
                <span className="font-semibold text-gray-900">{formatCurrency(payment.principalAndInterest)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Property Tax</span>
                <span className="font-semibold text-gray-900">{formatCurrency(payment.propertyTax)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Home Insurance</span>
                <span className="font-semibold text-gray-900">{formatCurrency(payment.insurance)}</span>
              </div>
              {payment.hoaFees > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">HOA Fees</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(payment.hoaFees)}</span>
                </div>
              )}
              {payment.pmi > 0 && (
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">PMI</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(payment.pmi)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Loan Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Loan Amount</p>
              <p className="text-xl font-bold text-[#21266c]">{formatCurrency(totalStats.loanAmount)}</p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Down Payment</p>
              <p className="text-xl font-bold text-[#21266c]">{formatCurrency(totalStats.downPaymentAmount)}</p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Total Interest</p>
              <p className="text-xl font-bold text-[#21266c]">{formatCurrency(totalStats.totalInterest)}</p>
            </div>
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Total Paid</p>
              <p className="text-xl font-bold text-[#21266c]">{formatCurrency(totalStats.totalPaid)}</p>
            </div>
          </div>

          {/* Payment Breakdown Chart */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Payment Breakdown</h4>
            <div className="space-y-3">
              {[
                { label: "Principal & Interest", value: payment.principalAndInterest, color: "bg-[#3b82f6]" },
                { label: "Property Tax", value: payment.propertyTax, color: "bg-green-500" },
                { label: "Home Insurance", value: payment.insurance, color: "bg-[#d4af37]" },
                ...(payment.hoaFees > 0 ? [{ label: "HOA Fees", value: payment.hoaFees, color: "bg-purple-500" }] : []),
                ...(payment.pmi > 0 ? [{ label: "PMI", value: payment.pmi, color: "bg-red-500" }] : []),
              ].map((item) => {
                const percentage = (item.value / payment.total) * 100;
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{item.label}</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
