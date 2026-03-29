import React from 'react';
import { Head } from '@inertiajs/react';

interface Props {
    pipeline: any;
    stages: any;
}

export default function Index({ pipeline, stages }: Props) {
    return (
        <div className="p-6">
            <Head title="Leads Kanban" />
            <h1 className="text-2xl font-bold mb-6">Leads - {pipeline.name}</h1>
            
            <div className="flex gap-4 overflow-x-auto pb-4">
                {stages.map((stage: any) => (
                    <div key={stage.id} className="min-w-[300px] bg-gray-100 rounded-lg p-4">
                        <h2 className="font-semibold mb-4 flex justify-between">
                            {stage.name}
                            <span className="bg-gray-200 px-2 rounded text-sm">{stage.leads.total}</span>
                        </h2>
                        
                        <div className="space-y-3">
                            {stage.leads.data.map((lead: any) => (
                                <div key={lead.id} className="bg-white p-3 rounded shadow-sm border border-gray-200">
                                    <h3 className="font-medium text-sm">{lead.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{lead.person?.name}</p>
                                    <div className="mt-2 flex justify-between items-center">
                                        <span className="text-xs font-semibold text-blue-600">
                                            ${lead.lead_value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
