import { Icon } from '../data/seed'
import jsPDF from 'jspdf'

// ──────────────────────────────────────────────
// PayslipModal — Shows salary breakdown with PDF download
// Pops up when user clicks "View Payslip" on the dashboard
// ──────────────────────────────────────────────
export function PayslipModal({ data, employee, onClose }) {
  // Calculate totals from the payslip data
  const gross = data.basic + data.hra + data.transport + data.medical + data.special
  const deductions = data.pf + data.tax + data.professional_tax
  const net = gross - deductions

  // Generate and download a PDF payslip using jsPDF
  const downloadPDF = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()

    // ── Green header bar ──
    doc.setFillColor(27, 94, 79)
    doc.rect(0, 0, pageWidth, 40, 'F')

    // Company name and title
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('Fluid HR', 14, 16)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Pay Slip', 14, 24)
    doc.text(data.month, 14, 31)

    // Employee info (right-aligned)
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.text(`Employee: ${employee.fullName}`, pageWidth - 14, 16, { align: 'right' })
    doc.text(`Role: ${employee.role}`, pageWidth - 14, 22, { align: 'right' })
    doc.text(`Dept: ${employee.dept}`, pageWidth - 14, 28, { align: 'right' })
    doc.text(`Date: ${data.date}`, pageWidth - 14, 34, { align: 'right' })

    // ── Earnings and Deductions sections ──
    let y = 52
    doc.setTextColor(27, 94, 79)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Earnings', 14, y)
    doc.text('Deductions', pageWidth / 2 + 4, y)
    y += 2
    doc.setDrawColor(200, 230, 220)
    doc.line(14, y, pageWidth - 14, y)
    y += 8

    const earnings = [
      ['Basic Salary', data.basic],
      ['HRA', data.hra],
      ['Transport Allowance', data.transport],
      ['Medical Allowance', data.medical],
      ['Special Allowance', data.special],
    ]
    const deductionsList = [
      ['Provident Fund', data.pf],
      ['Income Tax', data.tax],
      ['Professional Tax', data.professional_tax],
    ]

    // Print earnings (left column)
    doc.setTextColor(40, 40, 40)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    earnings.forEach(([label, value]) => {
      doc.text(label, 14, y)
      doc.text(`\u20B9 ${value.toLocaleString()}`, pageWidth / 2 - 4, y, { align: 'right' })
      y += 7
    })

    // Print deductions (right column)
    y = 62
    deductionsList.forEach(([label, value]) => {
      doc.text(label, pageWidth / 2 + 4, y)
      doc.text(`\u20B9 ${value.toLocaleString()}`, pageWidth - 14, y, { align: 'right' })
      y += 7
    })

    // ── Summary row ──
    y = Math.max(y, 62 + earnings.length * 7) + 4
    doc.setDrawColor(200, 230, 220)
    doc.line(14, y, pageWidth - 14, y)
    y += 8

    doc.setFillColor(230, 247, 242)
    doc.roundedRect(14, y, pageWidth - 28, 20, 3, 3, 'F')
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(27, 94, 79)
    doc.text('Gross Earnings', 20, y + 8)
    doc.text(`\u20B9 ${gross.toLocaleString()}`, pageWidth / 2 - 4, y + 8, { align: 'right' })
    doc.text('Total Deductions', pageWidth / 2 + 4, y + 8)
    doc.text(`\u20B9 ${deductions.toLocaleString()}`, pageWidth - 20, y + 8, { align: 'right' })

    // Net pay (big, centered)
    doc.setFontSize(13)
    doc.text(`Net Pay: \u20B9 ${net.toLocaleString()}`, pageWidth / 2, y + 17, { align: 'center' })
    y += 32

    // Footer disclaimer
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(120, 120, 120)
    doc.text('This is a computer-generated payslip. No signature required.', pageWidth / 2, y, { align: 'center' })

    // Save the PDF with a descriptive filename
    doc.save(`Payslip_${data.month.replace(' ', '_')}_${employee.fullName.replace(' ', '_')}.pdf`)
  }

  // Helper component for a single earnings/deductions row
  const Row = ({ label, value }) => (
    <div className="flex justify-between py-1.5">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-bold text-gray-700">&#8377; {value.toLocaleString()}</span>
    </div>
  )

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header with employee info and download button */}
        <div className="bg-gradient-to-r from-[#1B5E4F] to-[#2d8a72] rounded-t-3xl px-6 py-5 flex justify-between items-start">
          <div>
            <h2 className="text-white text-lg font-bold">Pay Slip</h2>
            <p className="text-green-200 text-sm mt-0.5">{data.month} · Paid on {data.date}</p>
            <p className="text-green-300 text-xs mt-1">{employee.fullName} · {employee.role}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={downloadPDF}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors">
              {Icon.download} Download PDF
            </button>
            <button onClick={onClose} className="text-white/70 hover:text-white">{Icon.close}</button>
          </div>
        </div>

        <div className="p-6">
          {/* Summary cards — gross and deductions side by side */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-[#E6F7F2] rounded-2xl p-4">
              <p className="text-xs text-[#5BBF9F] font-bold uppercase tracking-wide">Gross Earnings</p>
              <p className="text-2xl font-black text-[#1B5E4F] mt-1">&#8377; {gross.toLocaleString()}</p>
            </div>
            <div className="bg-red-50 rounded-2xl p-4">
              <p className="text-xs text-red-400 font-bold uppercase tracking-wide">Deductions</p>
              <p className="text-2xl font-black text-red-500 mt-1">&#8377; {deductions.toLocaleString()}</p>
            </div>
          </div>

          {/* Net pay — prominent green banner */}
          <div className="bg-[#1B5E4F] rounded-2xl p-4 mb-5 text-center">
            <p className="text-green-300 text-xs font-bold uppercase tracking-wide">Net Pay</p>
            <p className="text-3xl font-black text-white mt-1">&#8377; {net.toLocaleString()}</p>
          </div>

          {/* Detailed breakdown — earnings on left, deductions on right */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-extrabold text-[#1B5E4F] uppercase tracking-wide mb-2">Earnings</h3>
              <div className="divide-y divide-gray-100">
                <Row label="Basic Salary" value={data.basic}/>
                <Row label="HRA" value={data.hra}/>
                <Row label="Transport" value={data.transport}/>
                <Row label="Medical" value={data.medical}/>
                <Row label="Special" value={data.special}/>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-red-400 uppercase tracking-wide mb-2">Deductions</h3>
              <div className="divide-y divide-gray-100">
                <Row label="Provident Fund" value={data.pf}/>
                <Row label="Income Tax" value={data.tax}/>
                <Row label="Professional Tax" value={data.professional_tax}/>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-300 mt-5">Computer generated payslip · No signature required</p>
        </div>
      </div>
    </div>
  )
}
