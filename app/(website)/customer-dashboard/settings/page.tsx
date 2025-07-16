import { redirect } from 'next/navigation';

export default function CustomerDashboardPage() {
    redirect('/customer-dashboard/settings/account');
}
