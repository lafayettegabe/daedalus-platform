'use client';

import { withSubscription } from '../../components/withSubscription';

function ProtectedRoute() {
  return (
    <div>
      This is a protected route.
    </div>
)}

export default withSubscription(ProtectedRoute);
