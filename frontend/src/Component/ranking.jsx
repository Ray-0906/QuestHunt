import React, { useEffect, useMemo, useState } from 'react';
import { IconCrown, IconSword, IconShield, IconStar, IconArrowRight } from '@tabler/icons-react';
import { getRankings } from '../service/feature';
import { getLevelDetails } from '../service/maths';
import { useSelector } from 'react-redux';
import SoloLoading from './Loading';

const RankingLeaderboard = () => {
    const [currentUsername, setcurrentUsername] = useState("");
    const data1 = useSelector((state) => state.auth.userData);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        if (data1?.username) {
            setcurrentUsername(data1.username);
        }
    }, [data1]);
    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const data = await getRankings();
                setUsers(data);

            } catch (error) {
                console.error('Failed to get Rankings:', error);
            }
            finally{
                setIsLoading(false);
            }
        };

        fetchRankings();

    }, []);
    const currentPosition = useMemo(() => {
        const index = users.findIndex(u => u.username === currentUsername);
        return index !== -1 ? index + 1 : 'N/A';
    }, [users, currentUsername]);
    return (
        <div className="relative bg-[#0a0a15]/95 backdrop-blur-sm rounded-2xl border-2 border-blue-500/30 shadow-2xl shadow-blue-900/30 overflow-hidden">
            {isLoading && <SoloLoading />}
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
          linear-gradient(to right, rgba(0, 198, 255, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 198, 255, 0.1) 1px, transparent 1px)
        `,
                backgroundSize: '40px 40px'
            }} />

            {/* Leaderboard Header */}
            <div className="p-6 border-b border-blue-900/50">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 uppercase tracking-widest">
                    Hunter Rankings
                </h2>
                <p className="text-blue-400/80 mt-2">Current Season: Shadow Monarch's Reign</p>
            </div>

            {/* Ranking Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-blue-400/80 uppercase text-sm tracking-widest border-b border-blue-900/50">
                            <th className="px-6 py-4 text-left">Rank</th>
                            <th className="px-6 py-4 text-left">Hunter</th>
                            <th className="px-6 py-4 text-center">Level</th>
                            <th className="px-6 py-4 text-center">XP</th>
                            <th className="px-6 py-4 text-right">Stats</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={index}
                                className="group border-b border-blue-900/50 hover:bg-blue-900/10 transition-all duration-300"
                            >
                                {/* Rank Column */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <span className={`w-8 h-8 flex items-center justify-center rounded-full 
                      ${index === 0 ? 'bg-amber-400/20 text-amber-400' :
                                                index === 1 ? 'bg-blue-400/20 text-blue-400' :
                                                    index === 2 ? 'bg-purple-400/20 text-purple-400' :
                                                        'bg-blue-900/20 text-blue-400'}`}>
                                            {index === 0 ? <IconCrown className="w-5 h-5" /> : index + 1}
                                        </span>
                                    </div>
                                </td>

                                {/* Hunter Info */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={"./mc.png"}
                                            className="w-10 h-10 rounded-full border-2 border-blue-900/50"
                                            alt={user.username}
                                        />
                                        <div>
                                            <div className="text-blue-200 font-medium">{user.username}</div>
                                            <div className="text-blue-400/60 text-sm">Uncharted</div>
                                        </div>
                                    </div>
                                </td>

                                {/* Level */}
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <IconStar className="w-4 h-4 text-amber-400" />
                                        <span className="text-blue-200">Lv. {getLevelDetails(user.profile.exp).level}</span>
                                    </div>
                                </td>

                                {/* XP */}
                                <td className="px-6 py-4 text-center">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/20 text-blue-400">
                                        <span className="text-sm font-mono">+{user.profile.exp} XP</span>
                                    </div>
                                </td>

                                {/* Stats */}
                                <td className="px-6 py-4 text-right">
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex items-center justify-end space-x-2">
                                            <IconSword className="w-4 h-4 text-red-400" />
                                            <div className="w-24 h-2 bg-blue-900/50 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full"
                                                    style={{ width: `${getLevelDetails(user.profile.stats.strength).progressPercentage}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-end space-x-2">
                                            <IconShield className="w-4 h-4 text-blue-400" />
                                            <div className="w-24 h-2 bg-blue-900/50 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                                                    style={{ width: `${getLevelDetails(user.profile.stats.intelligence).progressPercentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Ranking Footer */}
            <div className="p-4 border-t border-blue-900/50">
                <div className="flex items-center justify-between text-blue-400/80 text-sm">
                    <span>Your Current Position: #{currentPosition}</span>
                    <button className="flex items-center space-x-2 hover:text-cyan-400 transition-colors">
                        <span>Show More</span>
                        <IconArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default RankingLeaderboard;