"use client";

import { useState, useEffect, useRef } from "react";
import { PieChart, Download, ChevronDown, ChevronUp, Info, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

interface AmortizationInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  startDate: string;
}

interface PaymentDetail {
  paymentNumber: number;
  date: string;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function AmortizationCalculator() {
  const defaultInputs: AmortizationInputs = {
    loanAmount: 0,
    interestRate: 0,
    loanTerm: 30,
    startDate: new Date().toISOString().split('T')[0] ?? '',
  };

  const [inputs, setInputs] = useState<AmortizationInputs>(defaultInputs);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const [schedule, setSchedule] = useState<PaymentDetail[]>([]);
  const [summary, setSummary] = useState({
    totalPayment: 0,
    totalPrincipal: 0,
    totalInterest: 0,
    monthlyPayment: 0,
  });

  const [expandedYear, setExpandedYear] = useState<number | null>(1);
  const [viewMode, setViewMode] = useState<"yearly" | "monthly">("yearly");

  useEffect(() => {
    calculateAmortization();
  }, [inputs]);

  const calculateAmortization = () => {
    const { loanAmount, interestRate, loanTerm } = inputs;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly payment
    const monthlyPayment = monthlyRate === 0
      ? loanAmount / numberOfPayments
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    let balance = loanAmount;
    const newSchedule: PaymentDetail[] = [];
    let totalInterest = 0;
    let totalPrincipal = 0;

    const startDate = new Date(inputs.startDate);

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance = balance - principalPayment;

      // Ensure balance doesn't go negative due to rounding
      if (balance < 0) balance = 0;

      totalInterest += interestPayment;
      totalPrincipal += principalPayment;

      // Calculate payment date
      const paymentDate = new Date(startDate);
      paymentDate.setMonth(paymentDate.getMonth() + i);

      newSchedule.push({
        paymentNumber: i,
        date: paymentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }

    setSchedule(newSchedule);
    setSummary({
      totalPayment: monthlyPayment * numberOfPayments,
      totalPrincipal,
      totalInterest,
      monthlyPayment,
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

  const formatCurrencyDetailed = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const exportToCSV = () => {
    const headers = ['Payment #', 'Date', 'Payment', 'Principal', 'Interest', 'Balance'];
    const rows = schedule.map(p => [
      p.paymentNumber,
      p.date,
      p.payment.toFixed(2),
      p.principal.toFixed(2),
      p.interest.toFixed(2),
      p.balance.toFixed(2)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'amortization-schedule.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInputs(defaultInputs);
    setExpandedYear(1);
  };

  const tooltips: { [key: string]: string } = {
    loanAmount: "The total amount borrowed for your mortgage, after subtracting your down payment.",
    interestRate: "The annual interest rate on your loan. This greatly impacts your total interest paid.",
    loanTerm: "The number of years to repay the loan. Shorter terms mean higher payments but less total interest.",
    startDate: "The date of your first mortgage payment. This helps you see exactly when payments are due."
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

  // Group payments by year
  const groupByYear = () => {
    const years: { [key: number]: PaymentDetail[] } = {};
    schedule.forEach(payment => {
      const year = Math.ceil(payment.paymentNumber / 12);
      if (!years[year]) years[year] = [];
      years[year].push(payment);
    });
    return years;
  };

  const yearlyData = groupByYear();

  const InputField = ({ label, value, onChange, type = "number", suffix = "", step = "1", min = "0", tooltipId, placeholder = "" }: any) => {
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
        if (type === "number") {
          const parsed = parseFloat(val);
          onChange(isNaN(parsed) ? 0 : parsed);
        } else {
          onChange(val);
        }
      }, 300);
    };

    return (
      <div className="space-y-2">
        <label className="flex items-center text-sm font-semibold text-gray-700">
          {label}
          {tooltipId && <Tooltip text={tooltips[tooltipId] ?? ''} id={tooltipId} />}
        </label>
        <div className="relative">
          <input
            type={type}
            value={type === "number" ? (localValue || '') : localValue}
            onChange={handleChange}
            step={step}
            min={min}
            placeholder={placeholder}
            className={`w-full px-4 ${suffix ? 'pr-12' : 'pr-4'} py-3 bg-white border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent transition-all hover:border-gray-300`}
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
          <PieChart className="w-7 h-7 text-[#d4af37]" />
          Amortization Schedule
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-300 rounded-lg font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <Button
            variant="secondary"
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-[#21266c] text-white hover:bg-[#3b82f6]"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InputField
          label="Loan Amount"
          value={inputs.loanAmount}
          onChange={(val: number) => setInputs({ ...inputs, loanAmount: val })}
          step="1000"
          tooltipId="loanAmount"
          placeholder="280000"
        />
        <InputField
          label="Interest Rate"
          value={inputs.interestRate}
          onChange={(val: number) => setInputs({ ...inputs, interestRate: val })}
          suffix="%"
          step="0.1"
          tooltipId="interestRate"
          placeholder="7.0"
        />
        <InputField
          label="Loan Term"
          value={inputs.loanTerm}
          onChange={(val: number) => setInputs({ ...inputs, loanTerm: val })}
          suffix="years"
          tooltipId="loanTerm"
          placeholder="30"
        />
        <InputField
          label="Start Date"
          value={inputs.startDate}
          onChange={(val: string) => setInputs({ ...inputs, startDate: val })}
          type="date"
          tooltipId="startDate"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-[#d4af37]/10 to-[#c5a028]/5 border-2 border-[#d4af37] rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-2">Monthly Payment</p>
          <p className="text-2xl font-bold text-[#21266c]">{formatCurrency(summary.monthlyPayment)}</p>
        </div>
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-2">Total Principal</p>
          <p className="text-2xl font-bold text-[#21266c]">{formatCurrency(summary.totalPrincipal)}</p>
        </div>
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-2">Total Interest</p>
          <p className="text-2xl font-bold text-[#21266c]">{formatCurrency(summary.totalInterest)}</p>
        </div>
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-5">
          <p className="text-sm text-gray-600 mb-2">Total Paid</p>
          <p className="text-2xl font-bold text-[#21266c]">{formatCurrency(summary.totalPayment)}</p>
        </div>
      </div>

      {/* Principal vs Interest Chart */}
      <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#21266c] mb-4">Principal vs Interest Over Time</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-2">
              <div className="w-4 h-4 bg-[#3b82f6] rounded"></div>
              <span className="text-sm text-gray-600">Principal</span>
            </div>
            <span className="text-sm font-semibold text-[#21266c]">{formatCurrency(summary.totalPrincipal)}</span>
          </div>
          <div className="h-8 bg-gray-200 rounded-full overflow-hidden flex">
            <div
              className="bg-[#3b82f6]"
              style={{ width: `${(summary.totalPrincipal / summary.totalPayment) * 100}%` }}
            />
            <div
              className="bg-red-500"
              style={{ width: `${(summary.totalInterest / summary.totalPayment) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-600">Interest</span>
            </div>
            <span className="text-sm font-semibold text-[#21266c]">{formatCurrency(summary.totalInterest)}</span>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-gray-700">View:</span>
        <div className="flex bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode("yearly")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === "yearly"
                ? "bg-[#3b82f6] text-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            By Year
          </button>
          <button
            onClick={() => setViewMode("monthly")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === "monthly"
                ? "bg-[#3b82f6] text-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            All Months
          </button>
        </div>
      </div>

      {/* Amortization Schedule */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        {viewMode === "yearly" ? (
          <div className="divide-y divide-gray-200">
            {Object.entries(yearlyData).map(([year, payments]) => {
              const yearNum = parseInt(year);
              const isExpanded = expandedYear === yearNum;
              const yearTotal = payments.reduce((sum, p) => sum + p.payment, 0);
              const yearPrincipal = payments.reduce((sum, p) => sum + p.principal, 0);
              const yearInterest = payments.reduce((sum, p) => sum + p.interest, 0);
              const endBalance = payments[payments.length - 1]?.balance ?? 0;

              return (
                <div key={year}>
                  <button
                    onClick={() => setExpandedYear(isExpanded ? null : yearNum)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-600" /> : <ChevronDown className="w-5 h-5 text-gray-600" />}
                      <span className="font-semibold text-[#21266c]">Year {year}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-8 text-sm">
                      <div className="text-right">
                        <p className="text-gray-500 text-xs mb-1">Total Payment</p>
                        <p className="text-[#21266c] font-semibold">{formatCurrency(yearTotal)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-xs mb-1">Principal</p>
                        <p className="text-[#3b82f6] font-semibold">{formatCurrency(yearPrincipal)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-xs mb-1">Interest</p>
                        <p className="text-red-500 font-semibold">{formatCurrency(yearInterest)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-xs mb-1">Balance</p>
                        <p className="text-[#21266c] font-semibold">{formatCurrency(endBalance)}</p>
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="bg-gray-50 border-t border-gray-200 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr className="text-gray-600 text-left">
                            <th className="px-6 py-3 font-medium">Payment #</th>
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 font-medium text-right">Payment</th>
                            <th className="px-6 py-3 font-medium text-right">Principal</th>
                            <th className="px-6 py-3 font-medium text-right">Interest</th>
                            <th className="px-6 py-3 font-medium text-right">Balance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {payments.map((payment) => (
                            <tr key={payment.paymentNumber} className="hover:bg-white transition-colors">
                              <td className="px-6 py-3 text-[#21266c]">{payment.paymentNumber}</td>
                              <td className="px-6 py-3 text-gray-600">{payment.date}</td>
                              <td className="px-6 py-3 text-right text-[#21266c]">{formatCurrencyDetailed(payment.payment)}</td>
                              <td className="px-6 py-3 text-right text-[#3b82f6]">{formatCurrencyDetailed(payment.principal)}</td>
                              <td className="px-6 py-3 text-right text-red-500">{formatCurrencyDetailed(payment.interest)}</td>
                              <td className="px-6 py-3 text-right text-[#21266c] font-semibold">{formatCurrency(payment.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr className="text-gray-600 text-left">
                  <th className="px-6 py-3 font-medium">Payment #</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium text-right">Payment</th>
                  <th className="px-6 py-3 font-medium text-right">Principal</th>
                  <th className="px-6 py-3 font-medium text-right">Interest</th>
                  <th className="px-6 py-3 font-medium text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {schedule.map((payment) => (
                  <tr key={payment.paymentNumber} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 text-[#21266c]">{payment.paymentNumber}</td>
                    <td className="px-6 py-3 text-gray-600">{payment.date}</td>
                    <td className="px-6 py-3 text-right text-[#21266c]">{formatCurrencyDetailed(payment.payment)}</td>
                    <td className="px-6 py-3 text-right text-[#3b82f6]">{formatCurrencyDetailed(payment.principal)}</td>
                    <td className="px-6 py-3 text-right text-red-500">{formatCurrencyDetailed(payment.interest)}</td>
                    <td className="px-6 py-3 text-right text-[#21266c] font-semibold">{formatCurrency(payment.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
