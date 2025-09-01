# OMNIS Banking - User Testing Guide

## 🏦 Welcome to OMNIS Banking
Your Intelligent Financial Assistant

---

## 📱 Getting Started

### What You'll See First
When you open the app, you'll land on the **Home** tab with:
- **Account Balance**: ₦1,200,000 displayed prominently
- **Financial Health Score**: 99/100 with a green heart icon
- **User Profile**: Oluwasegun Lawrence (SME Owner)

---

## 🧪 Testing Scenarios

### 1. **Profile Overview Testing**
**What to Look For:**
- ✅ Green health score indicator (99/100)
- ✅ Account balance: ₦1,200,000
- ✅ Monthly income: ₦850,000
- ✅ Savings rate: 15%
- ✅ Recent transaction: +₦15,000 (1 day ago)

**Test Steps:**
1. Verify all numbers match the expected values
2. Check that the health score shows as green
3. Confirm the user initials "OL" appear in the profile circle

### 2. **Cash Flow Overview Testing**
**What to Look For:**
- ✅ **Monthly Inflow**: ₦750,000 (green card with +12% growth)
- ✅ **Monthly Outflow**: ₦85,000 (red card with -8% reduction)

**Test Steps:**
1. Scroll down to find the "Cash Flow Overview" section
2. Verify the inflow card is green/emerald colored
3. Verify the outflow card is red colored
4. Check the percentage indicators (+12% and -8%)

### 3. **Safe to Spend Testing**
**What to Look For:**
- ✅ **Amount**: ₦70,000
- ✅ **Green/emerald styling**
- ✅ **AI recommendation context**

**Test Steps:**
1. Look for "Safe to Spend This Week" section
2. Verify it's styled in emerald/green colors
3. Check the amount displays as ₦70,000
4. Confirm it mentions "AI-recommended spending limit"

### 4. **Savings Goal Progress Testing**
**What to Look For:**
- ✅ **Current**: ₦5,000
- ✅ **Target**: ₦50,000
- ✅ **Progress bar**: 10% complete
- ✅ **Progress bar color**: Dark slate

**Test Steps:**
1. Find the "Savings Goal Progress" section
2. Verify the progress bar shows 10% completion
3. Check the amounts (₦5,000 / ₦50,000)

---

## 🎯 Interactive Features Testing

### 5. **Recommendation Banner Testing**
**What to Look For:**
- ✅ Horizontal scrollable cards
- ✅ 4 different recommendation types
- ✅ Navigation arrows and dots
- ✅ Gradient backgrounds

**Test Steps:**
1. Scroll horizontally through recommendation cards
2. Try the left/right arrow buttons
3. Click on dots at the bottom to navigate
4. Tap "Start Saving" on the first card

### 6. **AI Chat Bubble Testing**
**What to Look For:**
- ✅ Appears after 2 seconds on home screen
- ✅ "OMNIS AI" branding
- ✅ Expandable interface
- ✅ Recommendation message

**Test Steps:**
1. Wait 2 seconds after loading the home page
2. Look for chat bubble in bottom-right corner
3. Tap to expand the chat interface
4. Click "View Recommendation" button

### 7. **Modal Flow Testing**
**Test the complete recommendation flow:**

**Step 1: Recommendation Modal**
1. Click "View Recommendation" from chat or banner
2. Verify modal shows "Flexible Savings Plan"
3. Check minimum amount: ₦5,000
4. Review the 5 key benefits listed
5. Click "Apply Now"

**Step 2: Transaction Processing**
1. Watch the loading animation (2.5 seconds)
2. Verify "Processing Transaction" message
3. Wait for success state

**Step 3: Success Confirmation**
1. Check green checkmark appears
2. Verify "Transaction Successful!" message
3. Confirm enrollment details
4. Click "Done"

**Step 4: Feedback Modal**
1. Choose thumbs up or thumbs down
2. Optionally add a comment
3. Click "Submit Feedback"
4. Verify thank you message

### 8. **Dashboard Appearance**
**After completing a transaction:**
- ✅ New "Financial Dashboard" section appears
- ✅ Shows total savings: ₦5,000
- ✅ Interest rate: 12%
- ✅ Duration: Flexible
- ✅ Goal progress: 10%

---

## 📊 Navigation Testing

### 9. **Bottom Navigation**
**Test all 5 tabs:**

**Home Tab** 🏠
- Profile, recommendations, transactions

**Transactions Tab** 💳
- Transaction history with icons
- Filter and calendar buttons
- Color-coded amounts (green/red)

**Insights Tab** 📊
- Financial overview cards
- Spending breakdown with progress bars
- Smart insights section

**Notifications Tab** 🔔
- Notification list with icons
- Read/unread states
- Notification settings toggles

**Settings Tab** ⚙️
- Profile summary card
- Settings groups (Account, Preferences)
- App information
- Sign out button

---

## 🐛 Common Issues to Check

### Visual Issues
- [ ] All text is readable (good contrast)
- [ ] Cards have proper shadows and borders
- [ ] Colors match the design (emerald, slate, red)
- [ ] Icons load properly
- [ ] Gradients display correctly

### Responsive Issues
- [ ] App works on mobile screens
- [ ] Cards don't overflow horizontally
- [ ] Text doesn't get cut off
- [ ] Buttons are easily tappable

### Interactive Issues
- [ ] All buttons respond to clicks
- [ ] Modals open and close properly
- [ ] Scrolling works smoothly
- [ ] Animations play correctly

---

## 📝 Test Checklist

### Core Features ✅
- [ ] Profile displays correct information
- [ ] Health score shows as 99/100 (green)
- [ ] Cash flow cards show correct amounts and colors
- [ ] Safe to spend shows ₦70,000 in green
- [ ] Savings progress shows 10% completion

### Interactive Elements ✅
- [ ] Chat bubble appears and expands
- [ ] Recommendation cards scroll horizontally
- [ ] Modal flow works end-to-end
- [ ] All 5 navigation tabs work
- [ ] Dashboard appears after transaction

### Polish & Performance ✅
- [ ] Animations are smooth
- [ ] Loading states work properly
- [ ] Colors and styling look professional
- [ ] No console errors
- [ ] App feels responsive

---

## 🎉 Success Criteria

**The app passes testing if:**
1. ✅ All financial data displays correctly
2. ✅ Color coding is consistent (green=positive, red=negative)
3. ✅ Interactive flows work without errors
4. ✅ Navigation between tabs is smooth
5. ✅ Modals and animations enhance the experience
6. ✅ The overall design feels professional and polished

---

## 📞 Need Help?

If you encounter any issues during testing:
1. Check the browser console for errors
2. Try refreshing the page
3. Test on different screen sizes
4. Verify all expected sections are visible

**Happy Testing! 🚀**