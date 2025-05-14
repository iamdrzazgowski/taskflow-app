import React from 'react';
import { useProfile } from '../../contexts/ProfileProvider';
import './HomePage.css';

export default function HomePage() {
    const { profile } = useProfile();

    return (
        <div>
            <div class='welcome-banner'>
                <div class='welcome-message'>
                    <div class='welcome-title'>
                        Witaj, {profile.first_name}!
                    </div>
                    <div class='welcome-subtitle'>
                        Masz 3 zadania zaplanowane na dziś.
                    </div>
                </div>
            </div>
        </div>
    );
}
