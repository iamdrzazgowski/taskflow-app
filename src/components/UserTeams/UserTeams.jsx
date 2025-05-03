import React from 'react';

export default function UserTeams({ profile }) {
    return (
        <div>
            Zespoły {profile.first_name} {profile.last_name}
        </div>
    );
}
