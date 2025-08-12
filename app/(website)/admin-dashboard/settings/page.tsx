import { redirect } from 'next/navigation';

export default function CustomerDashboardPage() {
    redirect('/admin-dashboard/settings/account');
}
