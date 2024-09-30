import { useState, useEffect } from 'react';
import { fetchUserProfile } from '../api/apiService'; // apiService에서 데이터 패칭

export const useUserProfile = (userEmail, apiUrl) => {
    const [profileData, setProfileData] = useState({ nickname: '', email: '', oneLineResolution: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userEmail) return;

        const loadProfile = async () => {
            try {
                const profile = await fetchUserProfile(userEmail, apiUrl);
                setProfileData(profile);
            } catch (error) {
                console.error("프로필 로드 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [userEmail, apiUrl]);

    return { profileData, loading };
};
