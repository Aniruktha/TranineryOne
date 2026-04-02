import { useState } from 'react'
import { Icon } from '../data/seed'

// ──────────────────────────────────────────────
// ProfilePage — View and edit employee profile
// Shows personal details, bio, and skills
// ──────────────────────────────────────────────
export function ProfilePage({ employee, onSave }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...employee })

  // Shared input styles
  const inputClass = 'w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none bg-white disabled:bg-gray-50'

  // Profile fields to display — label and state key
  const profileFields = [
    ['Full Name', 'fullName'],
    ['Email', 'email'],
    ['Phone', 'phone'],
    ['Department', 'dept'],
    ['Role', 'role'],
    ['Manager', 'manager'],
    ['Location', 'location'],
  ]

  // Toggle edit mode; if turning off, save changes
  const handleEditToggle = () => {
    if (isEditing) onSave(formData)
    setIsEditing(!isEditing)
  }

  return (
    <div className="page-enter space-y-5">
      {/* Page header with edit/save button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-extrabold text-[#1a2e25]">My Profile</h2>
        <button onClick={handleEditToggle}
          className="flex items-center gap-1.5 bg-[#1B5E4F] hover:bg-[#2d8a72] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
          {isEditing ? Icon.check : Icon.edit}
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Hero banner with avatar */}
        <div className="bg-gradient-to-r from-[#1B5E4F] to-[#2d8a72] px-6 py-8 flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-black">
            {employee.avatar}
          </div>
          <div>
            <h3 className="text-white text-xl font-extrabold">{formData.fullName}</h3>
            <p className="text-green-200 text-sm">{formData.role} · {formData.dept}</p>
            <p className="text-green-300 text-xs mt-1">Joined {formData.joined}</p>
          </div>
        </div>

        {/* Editable fields in a 2-column grid */}
        <div className="p-6 grid grid-cols-2 gap-4">
          {profileFields.map(([label, key]) => (
            <div key={key}>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1 block">{label}</label>
              <input
                className={inputClass}
                value={formData[key] || ''}
                disabled={!isEditing}
                onChange={(e) => setFormData((f) => ({ ...f, [key]: e.target.value }))}
              />
            </div>
          ))}

          {/* Bio spans full width */}
          <div className="col-span-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1 block">Bio</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows="3"
              disabled={!isEditing}
              value={formData.bio || ''}
              onChange={(e) => setFormData((f) => ({ ...f, bio: e.target.value }))}
            />
          </div>
        </div>

        {/* Skills as colorful pills */}
        <div className="px-6 pb-6">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 block">Skills</label>
          <div className="flex flex-wrap gap-2">
            {(formData.skills || []).map((skill) => (
              <span key={skill}
                className="bg-[#E6F7F2] text-[#1B5E4F] px-3 py-1 rounded-full text-xs font-bold">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
