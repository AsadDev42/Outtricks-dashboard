import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  X, 
  Percent, 
  DollarSign, 
  Calendar 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin, AdminCoupon } from '../../context/AdminContext';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminCouponsView: React.FC = () => {
  const { coupons, addCoupon, deleteCoupon } = useAdmin();

  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountType, setDiscountType] = useState<AdminCoupon['discountType']>('percentage');
  const [discountValue, setDiscountValue] = useState('20');
  const [durationMonths, setDurationMonths] = useState('3');
  const [maxRedemptions, setMaxRedemptions] = useState('100');
  const [couponToDelete, setCouponToDelete] = useState<string | null>(null);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    addCoupon({
      code: couponCode.trim().toUpperCase().replace(/\s+/g, ''),
      discountType,
      discountValue: parseFloat(discountValue) || 10,
      durationMonths: parseInt(durationMonths) || 1,
      maxRedemptions: parseInt(maxRedemptions) || 100,
      status: 'active',
      expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });

    setCouponCode('');
    setIsAddCouponOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Promotional Discount Coupons & Vouchers
            </h2>
            <Badge variant="emerald" size="sm">{coupons.length} Active Vouchers</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Generate promotional promo codes, configure percentage and fixed rebates, and set redemption caps.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddCouponOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Create Coupon
        </Button>
      </div>

      {/* 2. Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 flex flex-col justify-between hover:border-emerald-500/40 transition-all text-xs"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <span className="font-mono font-black text-base text-emerald-600 dark:text-emerald-400 tracking-wider">
                    {coupon.code}
                  </span>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white">
                    {coupon.discountValue}{coupon.discountType === 'percentage' ? '% Discount' : '$ Flat Off'}
                  </div>
                </div>
                <Badge variant={coupon.status === 'active' ? 'emerald' : 'slate'} size="sm">
                  {coupon.status}
                </Badge>
              </div>

              {/* Stats Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Redemptions:</span>
                  <strong className="font-mono text-slate-900 dark:text-white">{coupon.redemptionCount} / {coupon.maxRedemptions || '∞'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <strong className="text-slate-900 dark:text-white">{coupon.durationMonths ? `${coupon.durationMonths} months` : 'Forever'}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Valid Until:</span>
                  <strong className="font-mono text-slate-900 dark:text-white">{coupon.expiryDate || 'No Expiry'}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end pt-3 border-t border-slate-100 dark:border-[#202020]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCouponToDelete(coupon.id)}
                className="p-1.5 h-7 w-7 text-rose-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>

          </div>
        ))}
      </div>

      {/* 3. Add Coupon Modal */}
      {isAddCouponOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={() => setIsAddCouponOpen(false)} />
          <div className="relative z-10 w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                  Create Promo Coupon
                </h3>
              </div>
              <button type="button" onClick={() => setIsAddCouponOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SUMMER50"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono font-bold uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Discount Type</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed_amount">Fixed Cash ($)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Value</label>
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Duration (Months)</label>
                  <input
                    type="number"
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Max Redemptions</label>
                  <input
                    type="number"
                    value={maxRedemptions}
                    onChange={(e) => setMaxRedemptions(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#202020]">
                <Button variant="secondary" size="sm" onClick={() => setIsAddCouponOpen(false)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit">Create Coupon</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Delete Confirmation */}
      {couponToDelete && (
        <AdminConfirmModal
          isOpen={Boolean(couponToDelete)}
          onClose={() => setCouponToDelete(null)}
          onConfirm={() => {
            if (couponToDelete) deleteCoupon(couponToDelete);
            setCouponToDelete(null);
          }}
          title="Delete Coupon"
          description="Are you sure you want to deactivate and remove this coupon code?"
          confirmText="Delete Coupon"
          variant="danger"
        />
      )}

    </div>
  );
};
