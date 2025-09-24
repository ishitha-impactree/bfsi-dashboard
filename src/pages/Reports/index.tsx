/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint no-unused-vars: off */
/* eslint react-hooks/exhaustive-deps: off */

'use client';

import { useRouter } from 'next/navigation';
import { Dropdown } from 'react-bootstrap';
import { MdChevronRight } from 'react-icons/md';
import { PiDotsThreeOutlineVertical } from 'react-icons/pi';
import Select from 'react-select';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import React, { useEffect, useState } from 'react';
import { ReportService } from '@/lib/service';
import toast from 'react-hot-toast';
import Avatar from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import PercentageBar from '../PercentageBar/PercentageBar';
import { ActionType, BreadCrumbProps } from '../types';
import './ReportList.css';
import { useModal } from '../Modal/Context';
import BlockOrUnblockOrDelete from '../BlockOrUnblockOrDelete/BlockOrUnblockOrDelete';

export default function ReportList({
  datacubes,
  token,
  apiKey,
}: {
  datacubes?: IDataCube[];
  token: string;
  apiKey: string;
}) {
  const router = useRouter();
  // Change to object to handle multiple standards
  const [reportFinancialYears, setReportFinancialYears] = useState<{[key: string]: any}>({});
  // Change to object to handle loading state per standard
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  // Change to object to handle errors per standard
  const [errors, setErrors] = useState<{[key: string]: { report_year: string }}>({});
  const [reports, setReports] = useState<any>([]);
  const [actionType, setActionType] = useState<ActionType>(null);
  const [currentReport, setCurrentReport] = useState<any | undefined>();
  const hideModal = useModal({});

  // console.log(datacubes, 'datacubes');

  // Create dynamic reportCarddata from datacubes standards with financial years
  const reportCarddata = React.useMemo(() => {
    if (!datacubes || datacubes.length === 0) {
      return [];
    }

    // Extract unique standards with their associated financial years
    const uniqueStandards = new Map();

    datacubes.forEach((datacube) => {
      if (datacube.standards && datacube.standards.length > 0) {
        datacube.standards.forEach((standard) => {
          if (!uniqueStandards.has(standard.id)) {
            uniqueStandards.set(standard.id, {
              id: standard.id,
              standard_name: standard.name,
              standard_avatar_url: standard.logo_url || '',
              is_active: standard.is_active,
              is_deleted: standard.is_deleted,
              financialYears: [], // Initialize array for financial years
            });
          }

          // Add this datacube's financial year to the standard if it doesn't exist
          const standardData = uniqueStandards.get(standard.id);
          const existingYear = standardData.financialYears.find((fy: any) => fy.value === datacube.id);
          if (!existingYear) {
            standardData.financialYears.push({
              label: datacube.financial_year,
              value: datacube.id,
            });
          }
        });
      }
    });

    const standardsArray = Array.from(uniqueStandards.values())
      .filter((standard) => standard.is_active && !standard.is_deleted);

    return standardsArray;
  }, [datacubes]);

  const breadCrumbMenu: BreadCrumbProps[] = [];

  const onSave = async (standardId: string) => {
    setLoadingStates((prev) => ({ ...prev, [standardId]: true }));

    const currentErrors: { report_year: string } = { report_year: '' };

    if (!reportFinancialYears[standardId]) {
      currentErrors.report_year = 'Financial Year is required';
    }

    if (currentErrors.report_year) {
      setErrors((prev) => ({ ...prev, [standardId]: currentErrors }));
      setLoadingStates((prev) => ({ ...prev, [standardId]: false }));
      return;
    }

    // Clear errors for this standard
    setErrors((prev) => ({ ...prev, [standardId]: { report_year: '' } }));

    const res = await ReportService.createReport(
      reportFinancialYears[standardId],
      apiKey,
      token,
    );

    const {
      success,
      data,
      error: _error,
    } = res?.data as {
      success: boolean;
      data: any;
      error: string[];
    };

    if (success) {
      toast.success('Report created successfully!');
      // Clear the selected financial year for this standard
      setReportFinancialYears((prev) => ({ ...prev, [standardId]: null }));
      router.refresh();
    } else {
      toast.error(_error[0]);
    }

    setLoadingStates((prev) => ({ ...prev, [standardId]: false }));
  };

  const getAllReports = async () => {
    const res = await ReportService.getReports(apiKey, token);
    const { success, data } = res.data as {
      success: boolean;
      data: any;
    };
    if (success) {
      setReports(data);
    }
  };

  useEffect(() => {
    getAllReports();
  }, []);

  const onClose = () => {
    hideModal();
    setCurrentReport(undefined);
    setActionType(null);
    router?.refresh();
  };

  const deleteReport = async () => {
    if (currentReport?.id) {
      const res = await ReportService.deleteReportById(
        apiKey,
        currentReport?.id,
      );
      const { success } = res?.data as { success: boolean };
      if (success) {
        toast.success('Report deleted successfully');
        setCurrentReport(undefined);
        onClose();
      }
    }
  };

  const deleteModal = useModal({
    content: (
      <BlockOrUnblockOrDelete
        actionType={actionType}
        onConfirm={() => deleteReport()}
        onClose={() => onClose()}
        deleteText="Are you sure you want to Delete this Report?"
      />
    ),
  });

  useEffect(() => {
    if (currentReport) {
      switch (actionType) {
        case 'Delete':
          deleteModal();
          break;
        default:
          break;
      }
    }
  }, [currentReport]);

  return (
    <PageHeaderWrapper breadCrumbMenu={breadCrumbMenu} title="Reports">
      <div className="bg-white" style={{ minHeight: '75vh' }}>
        {/* Reports */}
        <div className="px-3 px-md-5 border-bottom pb-4">
          <h5 className="pb-4 mt-4 fw-bold letter-spacing">Standards</h5>
          <div className="row m-0 gap-4">
            {reportCarddata?.map((report) => (
              <div
                className="col-12 col-lg-4 p-0 mb-4"
                key={report.id}
              >
                <div className="card rounded-2 border">
                  <div className="card-body ps-3">
                    <div className="d-flex align-items-center gap-2">
                      <Avatar
                        name={report.standard_name}
                        size="50px"
                        avator={report.standard_avatar_url}
                        className="rounded-circle"
                      />
                      <div>
                        <p className="m-0 fs-14 fw-600">
                          {report.standard_name}
                        </p>
                        <p className="m-0 fs-12 fw-500">
                          Create your
                          {' '}
                          {report.standard_name}
                          {' '}
                          report for multiple
                          financial year
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-4 align-items-center mt-5 flex-wrap">
                      <div>
                        <Select
                          id={`sector-${report.id}`}
                          value={reportFinancialYears[report.id]
                            ? report.financialYears.find((fy: any) => fy.value === reportFinancialYears[report.id]) : null}
                          onChange={(e: any) => setReportFinancialYears((prev) => ({
                            ...prev,
                            [report.id]: e?.value,
                          }))}
                          placeholder="Choose Financial year"
                          options={report.financialYears} // Use standard-specific financial years
                          isMulti={false}
                          styles={CustomStyles}
                          classNamePrefix="custom_select_input"
                          data-testid="customSelect"
                          inputId={`sector-${report.id}`}
                        />
                        {errors[report.id]?.report_year && (
                          <div className="error-message">
                            {errors[report.id].report_year}
                          </div>
                        )}
                      </div>
                      <Button
                        text="Create Report"
                        type="submit"
                        isPill
                        isDisabled={loadingStates[report.id]} // Use standard-specific loading state
                        isLoading={loadingStates[report.id]} // Use standard-specific loading state
                        onClick={() => onSave(report.id)} // Pass standard ID
                        className="w-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* My Reports */}
        <div className="px-3 px-md-5">
          <h5 className="py-4 fw-bold letter-spacing">My Reports</h5>
          <div className="d-flex flex-wrap gap-4 align-items-center my-4 pb-4">
            <div>
              <Select
                id="sector"
                placeholder="Choose Financial year"
                options={[
                  {
                    label: '2023-2024',
                    value: '2023-2024',
                  },
                  {
                    label: '2024-2025',
                    value: '2024-2025',
                  },
                  {
                    label: '2025-2026',
                    value: '2025-2026',
                  },
                ]}
                isMulti={false}
                styles={CustomStyles}
                classNamePrefix="custom_select_input"
                data-testid="customSelect"
                inputId="sector"
              />
            </div>
            <div>
              <Select
                id="standard-filter"
                placeholder="Select Standard"
                options={reportCarddata?.map((standard) => ({
                  label: standard.standard_name,
                  value: standard.standard_name,
                }))}
                isMulti={false}
                styles={CustomStyles}
                classNamePrefix="custom_select_input"
                data-testid="customSelect"
                inputId="standard-filter"
              />
            </div>
            <div>
              <Button
                text="Filter"
                type="submit"
                isSolid
                className="w-100 mt-0 mb-0"
                sufixIconChildren={(
                  <MdChevronRight
                    size={22}
                    color="var(--icon-color)"
                    className="ms-3"
                  />
                )}
              />
            </div>
          </div>
          <div className="row m-0 mt-3">
            {reports?.map((report: any) => (
              <div className="col-lg-4 p-0" key={report?.id}>
                <div
                  aria-hidden
                  className="me-3 mb-3 report-card p-4 rounded-2"
                >
                  <div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h5 className="fw-semibold m-0 letter-spacing">
                        {report?.financial_year}
                      </h5>
                      <div data-testid="action">
                        <Dropdown>
                          <Dropdown.Toggle
                            className="dropdownTitle"
                            data-testid="action"
                          >
                            <PiDotsThreeOutlineVertical
                              color="var(--textdark)"
                              fontSize={24}
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-css-businessunit-list">
                            <Dropdown.Item
                              data-testid="View"
                              onClick={() => router.push(`/report/${report?.id}`)}
                              className="mt-2 mb-2"
                            >
                              View
                            </Dropdown.Item>
                            <Dropdown.Item
                              data-testid="Delete"
                              onClick={() => {
                                setCurrentReport(report);
                                setActionType('Delete');
                              }}
                              className="mt-2 mb-2"
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className="border border-1 p-2 d-inline-block rounded-5 pe-4 mt-3">
                      <Avatar
                        name={report?.standard}
                        size="30"
                        avator=""
                        className="rounded-circle"
                      />
                      <span className="ms-2 fs-20 fw-500">
                        {report?.standard}
                      </span>
                    </div>
                    <div className="mt-4">
                      <PercentageBar
                        value={50}
                        suffixValueShown
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageHeaderWrapper>
  );
}
