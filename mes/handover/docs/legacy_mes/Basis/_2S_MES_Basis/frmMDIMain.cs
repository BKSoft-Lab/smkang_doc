using System;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Printing;
using System.Windows.Forms;
using _2S_Common;

namespace _2S_MES_Basis
{
	public class frmMDIMain : Form
	{
		private OracleConnection OraCon = new OracleConnection();

		private PageSettings pgSettings = new PageSettings();

		private PrintDocument printDoc = new PrintDocument();

		private string lsProgramTitle = "2S MES 기준정보";

		private string lsVersion = " Ver-250710A";

		private IContainer components;

		private ToolStrip tsToolbar;

		private ToolStripButton tsToolbarNew;

		private StatusStrip statusBar;

		private MenuStrip msMainMenu;

		private ToolStripMenuItem msFiles;

		private ToolStripMenuItem msBasic;

		private ImageList ilToolbar;

		private ToolStripButton tsToolbarSelect;

		private ToolStripButton tsToolbarSave;

		private ToolStripButton tsToolbarDelete;

		private ToolStripSeparator toolStripSeparator1;

		private ToolStripButton tsToolbarExcel;

		private ToolStripButton tsToolbarPrint;

		private ToolStripButton tsToolbarPreview;

		private ToolStripButton tsToolbarSetting;

		private ToolStripSeparator toolStripSeparator2;

		private ToolStripButton tsToolbarClose;

		private ToolStripMenuItem msWindow;

		private ToolStripMenuItem msHelp;

		private ToolStripMenuItem msBasic_Code;

		private ToolStripSeparator msBasic_Sep1;

		private ToolStripMenuItem msBasic_User;

		private ToolStripMenuItem msBasic_Usergroup;

		private ToolStripSeparator msBasic_Sep2;

		private ToolStripMenuItem msBasic_Menu;

		private ToolStripMenuItem msBasic_Auth;

		private ToolStripMenuItem msWindow_Horizontal;

		private ToolStripMenuItem msWindow_Vertical;

		private ToolStripMenuItem msWindow_Cascade;

		private ToolStripMenuItem msFiles_New;

		private ToolStripMenuItem msFiles_Select;

		private ToolStripMenuItem msFiles_Update;

		private ToolStripMenuItem msFiles_Delete;

		private ToolStripSeparator toolStripMenuItem1;

		private ToolStripMenuItem msFiles_Excel;

		private ToolStripMenuItem msFiles_Print;

		private ToolStripMenuItem msFiles_Preview;

		private ToolStripMenuItem msFiles_PrintSetting;

		private ToolStripSeparator toolStripMenuItem3;

		private ToolStripMenuItem msFiles_Close;

		private ToolStripMenuItem msHelp_Help;

		private ToolStripSeparator msHelp_Sep1;

		private ToolStripMenuItem msHelp_About;

		private ToolStripMenuItem msHelp_TestWindow;

		private ToolStripSeparator msBasic_Sep3;

		private ToolStripMenuItem msBasic_Customer;

		private Timer tmrStatusBar;

		private ToolStripStatusLabel statusLabel;

		private ToolStripMenuItem msStandard;

		private ToolStripMenuItem msStandard_ModelMng;

		private ToolStripMenuItem msStandard_ProcessMng;

		private ToolStripMenuItem msStandard_RouteMng;

		private ToolStripMenuItem msBasic_UnitProcessMng;

		private ToolStripMenuItem msBasic_UnitProcessLine;

		private ToolStripMenuItem msBasic_ProcessLine;

		private ToolStripSeparator msBasic_Sep4;

		private ToolStripMenuItem msStandard_PackingUnitMng;

		private ToolStripMenuItem msStandard_UnitProcesStdWorkTimeMng;

		private ToolStripMenuItem msBasic_LineMng;

		private ToolStripSeparator msBasic_Sep5;

		private ToolStripMenuItem msBasic_CaptionUpdate;

		private ToolStripMenuItem msStandard_TactTimeMng;

		private ToolStripMenuItem msStandard_ModelProperty;

		private ToolStripSeparator msStandard_Sep1;

		private ToolStripMenuItem msStandard_AssyGroupMstMng;

		private ToolStripMenuItem msStandard_ProdRouteMng;

		private ToolStripMenuItem msBasic_MenuAccessLogs;

		public frmMDIMain()
		{
			InitializeComponent();
			printDoc.PrintPage += printDoc_PrintPage;
			BackColor = Constants.BackColor;
		}

		private void frmMain_Load(object sender, EventArgs e)
		{
			getUserInfo();
			setMenu();
			getOrgUse();
			Text = lsProgramTitle + lsVersion + " [ Login : " + Constants.gsUserName + " " + Constants.gsUserDuty + "님 ]";
			statusLabel.Text = "Ready.";
			if (Constants.gsUserID != "DEVELOPER")
			{
				msBasic_Menu.Visible = false;
			}
		}

		private void getUserInfo()
		{
			DataTable userInfo = OraCon.getUserInfo(Constants.gsUserID);
			if (userInfo.Rows.Count > 0)
			{
				Constants.gsUserID = userInfo.Rows[0]["USER_ID"].ToString();
				Constants.gsUserName = userInfo.Rows[0]["USER_NAME"].ToString();
				Constants.gsUserDept = userInfo.Rows[0]["DEPT"].ToString();
				Constants.gsUserDuty = userInfo.Rows[0]["DUTY"].ToString();
				Constants.gsCompany = userInfo.Rows[0]["VENDOR"].ToString();
			}
		}

		private void setMenu()
		{
			if (Constants.gsUserID.Equals("DEVELOPER"))
			{
				return;
			}
			string text = "";
			try
			{
				text += "SELECT mnu.menu_code, ";
				text += "       mnu.menu_type ";
				text += "  FROM tb_mes_menu_all mnu ";
				text += " WHERE mnu.pgm_code = 'BAS' ";
				text += "   AND mnu.depth   != 1 ";
				text += "   AND mnu.menu_type = 'MNU' ";
				text += "   AND NOT EXISTS (SELECT * ";
				text += "                     FROM tb_mes_menu_authority ath, ";
				text += "                          tb_mes_user_authority usr ";
				text += "                    WHERE mnu.pgm_code   = ath.pgm_code ";
				text += "                      AND mnu.menu_code  = ath.menu_code ";
				text += "                      AND ath.user_class = usr.user_class ";
				text += "                      AND (ath.access_power  != 'N' ";
				text += "                       AND ath.execute_power != 'N')  ";
				text = text + "                      AND usr.user_id    = '" + Constants.gsUserID + "') ";
				text += " ORDER BY mnu.seq_idx ";
				DataTable queryResult = OraCon.getQueryResult(text);
				string text2 = "";
				for (int i = 0; i < queryResult.Rows.Count; i++)
				{
					text2 = queryResult.Rows[i]["MENU_CODE"].ToString();
					if (queryResult.Rows[i]["MENU_TYPE"].ToString().Equals("MNU"))
					{
						text2.FindByName<ToolStripMenuItem>(this).Visible = false;
					}
					else
					{
						text2.FindByName<ToolStripSeparator>(this).Visible = false;
					}
				}
			}
			catch
			{
			}
		}

		private void getOrgUse()
		{
			string text = "";
			text = "SELECT MAX(cod.code) org_code   FROM tb_cm_code cod  WHERE cod.code_group  = 'ORGANIZATION'    AND cod.attribute01 = 'Y'";
			Constants.gsOrgCode = OraCon.getQueryResultSchema(text).Trim();
			if (!Constants.gsOrgCode.Equals(""))
			{
				Constants.gbOrgUse = true;
				return;
			}
			Constants.gbOrgUse = false;
			Constants.DBLINK_MARK = "";
			Constants.gsDBLinkID = "";
		}

		private void msWindow_Horizontal_Click(object sender, EventArgs e)
		{
			LayoutMdi(MdiLayout.TileHorizontal);
		}

		private void msWindow_Vertical_Click(object sender, EventArgs e)
		{
			LayoutMdi(MdiLayout.TileVertical);
		}

		private void msWindow_Cascade_Click(object sender, EventArgs e)
		{
			LayoutMdi(MdiLayout.Cascade);
		}

		private bool makeChildForm(string formName)
		{
			if (!SystemCommon.MenuAccessable("BAS", formName))
			{
				return false;
			}
			Form[] mdiChildren = base.MdiChildren;
			foreach (Form form in mdiChildren)
			{
				if (formName.Equals(form.Name))
				{
					form.BringToFront();
					form.Focus();
					return false;
				}
			}
			return true;
		}

		private void msFiles_New_Click(object sender, EventArgs e)
		{
			mdiEventNew();
		}

		private void msFiles_Select_Click(object sender, EventArgs e)
		{
			mdiEventSelect();
		}

		private void msFiles_Update_Click(object sender, EventArgs e)
		{
			mdiEventSave();
		}

		private void msFiles_Delete_Click(object sender, EventArgs e)
		{
			mdiEventDelete();
		}

		private void msFiles_Excel_Click(object sender, EventArgs e)
		{
			mdiEventExcel();
		}

		private void msFiles_Print_Click(object sender, EventArgs e)
		{
			mdiEventPrint();
		}

		private void msFiles_Preview_Click(object sender, EventArgs e)
		{
			mdiEventPreview();
		}

		private void msFiles_PrintSetting_Click(object sender, EventArgs e)
		{
			mdiEventSetting();
		}

		private void msFiles_Close_Click(object sender, EventArgs e)
		{
			mdiEventClose();
		}

		private void tsToolbarNew_Click(object sender, EventArgs e)
		{
			mdiEventNew();
		}

		private void tsToolbarSelect_Click(object sender, EventArgs e)
		{
			mdiEventSelect();
		}

		private void tsToolbarSave_Click(object sender, EventArgs e)
		{
			mdiEventSave();
		}

		private void tsToolbarDelete_Click(object sender, EventArgs e)
		{
			mdiEventDelete();
		}

		private void tsToolbarExcel_Click(object sender, EventArgs e)
		{
			mdiEventExcel();
		}

		private void tsToolbarPrint_Click(object sender, EventArgs e)
		{
			mdiEventPrint();
		}

		private void tsToolbarPreview_Click(object sender, EventArgs e)
		{
			mdiEventPreview();
		}

		private void tsToolbarSetting_Click(object sender, EventArgs e)
		{
			mdiEventSetting();
		}

		private void tsToolbarClose_Click(object sender, EventArgs e)
		{
			mdiEventClose();
		}

		private void mdiEventNew()
		{
			if (base.ActiveMdiChild != null)
			{
				((MdiChildForm)base.ActiveMdiChild).gNew();
			}
		}

		private void mdiEventSelect()
		{
			if (base.ActiveMdiChild != null)
			{
				((MdiChildForm)base.ActiveMdiChild).gSelect();
			}
		}

		private void mdiEventSave()
		{
			if (base.ActiveMdiChild != null)
			{
				((MdiChildForm)base.ActiveMdiChild).gSave();
			}
		}

		private void mdiEventDelete()
		{
			if (base.ActiveMdiChild != null)
			{
				((MdiChildForm)base.ActiveMdiChild).gDelete();
			}
		}

		private void mdiEventExcel()
		{
			if (base.ActiveMdiChild != null)
			{
				((MdiChildForm)base.ActiveMdiChild).gExcel();
			}
		}

		private void mdiEventPrint()
		{
			if (base.ActiveMdiChild != null)
			{
				((MdiChildForm)base.ActiveMdiChild).gPrint();
			}
		}

		private void mdiEventPreview()
		{
			if (base.ActiveMdiChild != null)
			{
				((MdiChildForm)base.ActiveMdiChild).gPreview();
			}
		}

		private void printDoc_PrintPage(object sender, PrintPageEventArgs e)
		{
			string s = ".NET Printing is easy";
			Font font = new Font("Courier New", 12f);
			int left = e.MarginBounds.Left;
			int top = e.MarginBounds.Top;
			e.Graphics.DrawString(s, font, Brushes.Black, left, top);
		}

		private void mdiEventSetting()
		{
			PageSetupDialog pageSetupDialog = new PageSetupDialog();
			pageSetupDialog.PageSettings = pgSettings;
			pageSetupDialog.AllowOrientation = true;
			pageSetupDialog.AllowMargins = true;
			pageSetupDialog.ShowDialog();
		}

		private void mdiEventClose()
		{
			if (base.ActiveMdiChild != null)
			{
				base.ActiveMdiChild.Close();
			}
			else if (MessageBox.Show(lsProgramTitle + " 프로그램을 종료하시겠습니까?  ", "확인", MessageBoxButtons.YesNo, MessageBoxIcon.Asterisk, MessageBoxDefaultButton.Button2) == DialogResult.Yes)
			{
				Application.Exit();
			}
		}

		public void setStatusLabel(string statusMsg)
		{
			tmrStatusBar.Enabled = false;
			statusLabel.Text = statusMsg.ToString();
			tmrStatusBar.Enabled = true;
		}

		private void tmrStatusBar_Tick(object sender, EventArgs e)
		{
			statusLabel.Text = "";
			tmrStatusBar.Enabled = false;
		}

		private void OpenChildWindow(Form oForm)
		{
			string name = oForm.Name;
			if (makeChildForm(name))
			{
				oForm.MdiParent = this;
				oForm.WindowState = FormWindowState.Maximized;
				oForm.Show();
			}
		}

		private void msBasic_Code_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmCommonCode());
		}

		private void msBasic_User_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmUser());
		}

		private void msBasic_Usergroup_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmUserAuthority());
		}

		private void msBasic_Menu_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmMenuManagement());
		}

		private void msBasic_Auth_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmMenuAuthMng());
		}

		private void msBasic_Customer_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmCustomer());
		}

		private void msBasic_CaptionUpdate_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmCaptionUpdate());
		}

		private void msStandard_ModelMng_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmModelMng());
		}

		private void msStandard_ModelProperty_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmModelPropertyUpdate());
		}

		private void msStandard_AssyGroupMstMng_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmAssyGroupModelMng());
		}

		private void msStandard_ProcessMng_Click(object sender, EventArgs e)
		{
		}

		private void msStandard_RouteMng_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmRouteManagement());
		}

		private void msStandard_TactTimeMng_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmProdTactTimeManagement());
		}

		private void msBasic_UnitProcessMng_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmUnitProcessMng());
		}

		private void msBasic_UnitProcessLine_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmUnitProcessLineMng());
		}

		private void msBasic_ProcessLine_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmProcessLineConstMng());
		}

		private void msStandard_PackingUnitMng_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmPackingUnitMng());
		}

		private void msStandard_UnitProcesStdWorkTimeMng_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmUnitProcessWorkStdTimeMng());
		}

		private void msBasic_LineMng_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmProcessLineMng());
		}

		private void msStandard_SerialNumGenRuleMng_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmSerialNumRuleMng());
		}

		private void msStandard_ModelRevisionMapping_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmModelRevisionMapping());
		}

		private void msStandard_ProdRouteMng_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmProdRouteManagement());
		}

		private void msBasic_MenuAccessLogs_Click(object sender, EventArgs e)
		{
			OpenChildWindow(new frmMenuAccessLogs());
		}

		protected override void Dispose(bool disposing)
		{
			if (disposing && components != null)
			{
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		private void InitializeComponent()
		{
			this.components = new System.ComponentModel.Container();
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(_2S_MES_Basis.frmMDIMain));
			this.tsToolbar = new System.Windows.Forms.ToolStrip();
			this.tsToolbarNew = new System.Windows.Forms.ToolStripButton();
			this.tsToolbarSelect = new System.Windows.Forms.ToolStripButton();
			this.tsToolbarSave = new System.Windows.Forms.ToolStripButton();
			this.tsToolbarDelete = new System.Windows.Forms.ToolStripButton();
			this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
			this.tsToolbarExcel = new System.Windows.Forms.ToolStripButton();
			this.tsToolbarPrint = new System.Windows.Forms.ToolStripButton();
			this.tsToolbarPreview = new System.Windows.Forms.ToolStripButton();
			this.tsToolbarSetting = new System.Windows.Forms.ToolStripButton();
			this.toolStripSeparator2 = new System.Windows.Forms.ToolStripSeparator();
			this.tsToolbarClose = new System.Windows.Forms.ToolStripButton();
			this.statusBar = new System.Windows.Forms.StatusStrip();
			this.statusLabel = new System.Windows.Forms.ToolStripStatusLabel();
			this.msMainMenu = new System.Windows.Forms.MenuStrip();
			this.msFiles = new System.Windows.Forms.ToolStripMenuItem();
			this.msFiles_New = new System.Windows.Forms.ToolStripMenuItem();
			this.msFiles_Select = new System.Windows.Forms.ToolStripMenuItem();
			this.msFiles_Update = new System.Windows.Forms.ToolStripMenuItem();
			this.msFiles_Delete = new System.Windows.Forms.ToolStripMenuItem();
			this.toolStripMenuItem1 = new System.Windows.Forms.ToolStripSeparator();
			this.msFiles_Excel = new System.Windows.Forms.ToolStripMenuItem();
			this.msFiles_Print = new System.Windows.Forms.ToolStripMenuItem();
			this.msFiles_Preview = new System.Windows.Forms.ToolStripMenuItem();
			this.msFiles_PrintSetting = new System.Windows.Forms.ToolStripMenuItem();
			this.toolStripMenuItem3 = new System.Windows.Forms.ToolStripSeparator();
			this.msFiles_Close = new System.Windows.Forms.ToolStripMenuItem();
			this.msBasic = new System.Windows.Forms.ToolStripMenuItem();
			this.msBasic_Code = new System.Windows.Forms.ToolStripMenuItem();
			this.msBasic_Sep1 = new System.Windows.Forms.ToolStripSeparator();
			this.msBasic_User = new System.Windows.Forms.ToolStripMenuItem();
			this.msBasic_Usergroup = new System.Windows.Forms.ToolStripMenuItem();
			this.msBasic_Sep2 = new System.Windows.Forms.ToolStripSeparator();
			this.msBasic_Menu = new System.Windows.Forms.ToolStripMenuItem();
			this.msBasic_Auth = new System.Windows.Forms.ToolStripMenuItem();
			this.msBasic_Sep3 = new System.Windows.Forms.ToolStripSeparator();
			this.msBasic_UnitProcessMng = new System.Windows.Forms.ToolStripMenuItem();
			this.msBasic_UnitProcessLine = new System.Windows.Forms.ToolStripMenuItem();
			this.msBasic_LineMng = new System.Windows.Forms.ToolStripMenuItem();
			this.msBasic_ProcessLine = new System.Windows.Forms.ToolStripMenuItem();
			this.msBasic_Sep4 = new System.Windows.Forms.ToolStripSeparator();
			this.msBasic_Customer = new System.Windows.Forms.ToolStripMenuItem();
			this.msBasic_Sep5 = new System.Windows.Forms.ToolStripSeparator();
			this.msBasic_CaptionUpdate = new System.Windows.Forms.ToolStripMenuItem();
			this.msStandard = new System.Windows.Forms.ToolStripMenuItem();
			this.msStandard_ModelMng = new System.Windows.Forms.ToolStripMenuItem();
			this.msStandard_ModelProperty = new System.Windows.Forms.ToolStripMenuItem();
			this.msStandard_AssyGroupMstMng = new System.Windows.Forms.ToolStripMenuItem();
			this.msStandard_Sep1 = new System.Windows.Forms.ToolStripSeparator();
			this.msStandard_ProcessMng = new System.Windows.Forms.ToolStripMenuItem();
			this.msStandard_RouteMng = new System.Windows.Forms.ToolStripMenuItem();
			this.msStandard_ProdRouteMng = new System.Windows.Forms.ToolStripMenuItem();
			this.msStandard_TactTimeMng = new System.Windows.Forms.ToolStripMenuItem();
			this.msStandard_PackingUnitMng = new System.Windows.Forms.ToolStripMenuItem();
			this.msStandard_UnitProcesStdWorkTimeMng = new System.Windows.Forms.ToolStripMenuItem();
			this.msWindow = new System.Windows.Forms.ToolStripMenuItem();
			this.msWindow_Horizontal = new System.Windows.Forms.ToolStripMenuItem();
			this.msWindow_Vertical = new System.Windows.Forms.ToolStripMenuItem();
			this.msWindow_Cascade = new System.Windows.Forms.ToolStripMenuItem();
			this.msHelp = new System.Windows.Forms.ToolStripMenuItem();
			this.msHelp_Help = new System.Windows.Forms.ToolStripMenuItem();
			this.msHelp_Sep1 = new System.Windows.Forms.ToolStripSeparator();
			this.msHelp_About = new System.Windows.Forms.ToolStripMenuItem();
			this.msHelp_TestWindow = new System.Windows.Forms.ToolStripMenuItem();
			this.ilToolbar = new System.Windows.Forms.ImageList(this.components);
			this.tmrStatusBar = new System.Windows.Forms.Timer(this.components);
			this.msBasic_MenuAccessLogs = new System.Windows.Forms.ToolStripMenuItem();
			this.tsToolbar.SuspendLayout();
			this.statusBar.SuspendLayout();
			this.msMainMenu.SuspendLayout();
			base.SuspendLayout();
			this.tsToolbar.BackColor = System.Drawing.Color.Gainsboro;
			this.tsToolbar.ImageScalingSize = new System.Drawing.Size(24, 24);
			this.tsToolbar.Items.AddRange(new System.Windows.Forms.ToolStripItem[11]
			{
				this.tsToolbarNew, this.tsToolbarSelect, this.tsToolbarSave, this.tsToolbarDelete, this.toolStripSeparator1, this.tsToolbarExcel, this.tsToolbarPrint, this.tsToolbarPreview, this.tsToolbarSetting, this.toolStripSeparator2,
				this.tsToolbarClose
			});
			this.tsToolbar.Location = new System.Drawing.Point(0, 24);
			this.tsToolbar.Name = "tsToolbar";
			this.tsToolbar.RenderMode = System.Windows.Forms.ToolStripRenderMode.System;
			this.tsToolbar.Size = new System.Drawing.Size(1384, 31);
			this.tsToolbar.TabIndex = 6;
			this.tsToolbar.Text = "toolStrip1";
			this.tsToolbarNew.Image = (System.Drawing.Image)resources.GetObject("tsToolbarNew.Image");
			this.tsToolbarNew.ImageScaling = System.Windows.Forms.ToolStripItemImageScaling.None;
			this.tsToolbarNew.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.tsToolbarNew.Name = "tsToolbarNew";
			this.tsToolbarNew.Size = new System.Drawing.Size(67, 28);
			this.tsToolbarNew.Text = " 신 규";
			this.tsToolbarNew.Click += new System.EventHandler(tsToolbarNew_Click);
			this.tsToolbarSelect.Image = (System.Drawing.Image)resources.GetObject("tsToolbarSelect.Image");
			this.tsToolbarSelect.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.tsToolbarSelect.Name = "tsToolbarSelect";
			this.tsToolbarSelect.Size = new System.Drawing.Size(67, 28);
			this.tsToolbarSelect.Text = " 조 회";
			this.tsToolbarSelect.Click += new System.EventHandler(tsToolbarSelect_Click);
			this.tsToolbarSave.Image = (System.Drawing.Image)resources.GetObject("tsToolbarSave.Image");
			this.tsToolbarSave.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.tsToolbarSave.Name = "tsToolbarSave";
			this.tsToolbarSave.Size = new System.Drawing.Size(67, 28);
			this.tsToolbarSave.Text = " 저 장";
			this.tsToolbarSave.Click += new System.EventHandler(tsToolbarSave_Click);
			this.tsToolbarDelete.Image = (System.Drawing.Image)resources.GetObject("tsToolbarDelete.Image");
			this.tsToolbarDelete.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.tsToolbarDelete.Name = "tsToolbarDelete";
			this.tsToolbarDelete.Size = new System.Drawing.Size(67, 28);
			this.tsToolbarDelete.Text = " 삭 제";
			this.tsToolbarDelete.Click += new System.EventHandler(tsToolbarDelete_Click);
			this.toolStripSeparator1.Name = "toolStripSeparator1";
			this.toolStripSeparator1.Size = new System.Drawing.Size(6, 31);
			this.tsToolbarExcel.BackColor = System.Drawing.Color.Transparent;
			this.tsToolbarExcel.Image = (System.Drawing.Image)resources.GetObject("tsToolbarExcel.Image");
			this.tsToolbarExcel.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.tsToolbarExcel.Name = "tsToolbarExcel";
			this.tsToolbarExcel.Size = new System.Drawing.Size(67, 28);
			this.tsToolbarExcel.Text = " 엑 셀";
			this.tsToolbarExcel.Click += new System.EventHandler(tsToolbarExcel_Click);
			this.tsToolbarPrint.Image = (System.Drawing.Image)resources.GetObject("tsToolbarPrint.Image");
			this.tsToolbarPrint.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.tsToolbarPrint.Name = "tsToolbarPrint";
			this.tsToolbarPrint.Size = new System.Drawing.Size(67, 28);
			this.tsToolbarPrint.Text = " 인 쇄";
			this.tsToolbarPrint.Click += new System.EventHandler(tsToolbarPrint_Click);
			this.tsToolbarPreview.Image = (System.Drawing.Image)resources.GetObject("tsToolbarPreview.Image");
			this.tsToolbarPreview.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.tsToolbarPreview.Name = "tsToolbarPreview";
			this.tsToolbarPreview.Size = new System.Drawing.Size(87, 28);
			this.tsToolbarPreview.Text = " 미리보기";
			this.tsToolbarPreview.Click += new System.EventHandler(tsToolbarPreview_Click);
			this.tsToolbarSetting.Image = (System.Drawing.Image)resources.GetObject("tsToolbarSetting.Image");
			this.tsToolbarSetting.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.tsToolbarSetting.Name = "tsToolbarSetting";
			this.tsToolbarSetting.Size = new System.Drawing.Size(63, 28);
			this.tsToolbarSetting.Text = " 설정";
			this.tsToolbarSetting.Click += new System.EventHandler(tsToolbarSetting_Click);
			this.toolStripSeparator2.Name = "toolStripSeparator2";
			this.toolStripSeparator2.Size = new System.Drawing.Size(6, 31);
			this.tsToolbarClose.Image = (System.Drawing.Image)resources.GetObject("tsToolbarClose.Image");
			this.tsToolbarClose.ImageTransparentColor = System.Drawing.Color.Magenta;
			this.tsToolbarClose.Name = "tsToolbarClose";
			this.tsToolbarClose.Size = new System.Drawing.Size(59, 28);
			this.tsToolbarClose.Text = "닫기";
			this.tsToolbarClose.Click += new System.EventHandler(tsToolbarClose_Click);
			this.statusBar.Font = new System.Drawing.Font("Tahoma", 9f, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, 0);
			this.statusBar.Items.AddRange(new System.Windows.Forms.ToolStripItem[1] { this.statusLabel });
			this.statusBar.Location = new System.Drawing.Point(0, 790);
			this.statusBar.Name = "statusBar";
			this.statusBar.Size = new System.Drawing.Size(1384, 22);
			this.statusBar.TabIndex = 4;
			this.statusLabel.AutoSize = false;
			this.statusLabel.Font = new System.Drawing.Font("Tahoma", 9f, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, 0);
			this.statusLabel.Name = "statusLabel";
			this.statusLabel.Size = new System.Drawing.Size(400, 17);
			this.statusLabel.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
			this.msMainMenu.Items.AddRange(new System.Windows.Forms.ToolStripItem[5] { this.msFiles, this.msBasic, this.msStandard, this.msWindow, this.msHelp });
			this.msMainMenu.Location = new System.Drawing.Point(0, 0);
			this.msMainMenu.MdiWindowListItem = this.msWindow;
			this.msMainMenu.Name = "msMainMenu";
			this.msMainMenu.Size = new System.Drawing.Size(1384, 24);
			this.msMainMenu.TabIndex = 5;
			this.msMainMenu.Text = "MainMenu";
			this.msFiles.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[11]
			{
				this.msFiles_New, this.msFiles_Select, this.msFiles_Update, this.msFiles_Delete, this.toolStripMenuItem1, this.msFiles_Excel, this.msFiles_Print, this.msFiles_Preview, this.msFiles_PrintSetting, this.toolStripMenuItem3,
				this.msFiles_Close
			});
			this.msFiles.Name = "msFiles";
			this.msFiles.ShortcutKeyDisplayString = "";
			this.msFiles.ShortcutKeys = System.Windows.Forms.Keys.F | System.Windows.Forms.Keys.Alt;
			this.msFiles.Size = new System.Drawing.Size(57, 20);
			this.msFiles.Text = "파일(&F)";
			this.msFiles_New.Name = "msFiles_New";
			this.msFiles_New.Size = new System.Drawing.Size(150, 22);
			this.msFiles_New.Text = "신규";
			this.msFiles_New.Click += new System.EventHandler(msFiles_New_Click);
			this.msFiles_Select.Name = "msFiles_Select";
			this.msFiles_Select.Size = new System.Drawing.Size(150, 22);
			this.msFiles_Select.Text = "조회";
			this.msFiles_Select.Click += new System.EventHandler(msFiles_Select_Click);
			this.msFiles_Update.Name = "msFiles_Update";
			this.msFiles_Update.Size = new System.Drawing.Size(150, 22);
			this.msFiles_Update.Text = "저장";
			this.msFiles_Update.Click += new System.EventHandler(msFiles_Update_Click);
			this.msFiles_Delete.Name = "msFiles_Delete";
			this.msFiles_Delete.Size = new System.Drawing.Size(150, 22);
			this.msFiles_Delete.Text = "삭제";
			this.msFiles_Delete.Click += new System.EventHandler(msFiles_Delete_Click);
			this.toolStripMenuItem1.Name = "toolStripMenuItem1";
			this.toolStripMenuItem1.Size = new System.Drawing.Size(147, 6);
			this.msFiles_Excel.Name = "msFiles_Excel";
			this.msFiles_Excel.Size = new System.Drawing.Size(150, 22);
			this.msFiles_Excel.Text = "엑셀";
			this.msFiles_Excel.Click += new System.EventHandler(msFiles_Excel_Click);
			this.msFiles_Print.Name = "msFiles_Print";
			this.msFiles_Print.Size = new System.Drawing.Size(150, 22);
			this.msFiles_Print.Text = "인쇄";
			this.msFiles_Print.Click += new System.EventHandler(msFiles_Print_Click);
			this.msFiles_Preview.Name = "msFiles_Preview";
			this.msFiles_Preview.Size = new System.Drawing.Size(150, 22);
			this.msFiles_Preview.Text = "인쇄 미리보기";
			this.msFiles_Preview.Click += new System.EventHandler(msFiles_Preview_Click);
			this.msFiles_PrintSetting.Name = "msFiles_PrintSetting";
			this.msFiles_PrintSetting.Size = new System.Drawing.Size(150, 22);
			this.msFiles_PrintSetting.Text = "프린터 설정";
			this.msFiles_PrintSetting.Click += new System.EventHandler(msFiles_PrintSetting_Click);
			this.toolStripMenuItem3.Name = "toolStripMenuItem3";
			this.toolStripMenuItem3.Size = new System.Drawing.Size(147, 6);
			this.msFiles_Close.Name = "msFiles_Close";
			this.msFiles_Close.Size = new System.Drawing.Size(150, 22);
			this.msFiles_Close.Text = "닫기";
			this.msFiles_Close.Click += new System.EventHandler(msFiles_Close_Click);
			this.msBasic.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[17]
			{
				this.msBasic_Code, this.msBasic_Sep1, this.msBasic_User, this.msBasic_Usergroup, this.msBasic_Sep2, this.msBasic_Menu, this.msBasic_Auth, this.msBasic_Sep3, this.msBasic_UnitProcessMng, this.msBasic_UnitProcessLine,
				this.msBasic_LineMng, this.msBasic_ProcessLine, this.msBasic_Sep4, this.msBasic_Customer, this.msBasic_Sep5, this.msBasic_CaptionUpdate, this.msBasic_MenuAccessLogs
			});
			this.msBasic.Name = "msBasic";
			this.msBasic.Size = new System.Drawing.Size(82, 20);
			this.msBasic.Text = "기초정보(&B)";
			this.msBasic_Code.Name = "msBasic_Code";
			this.msBasic_Code.Size = new System.Drawing.Size(178, 22);
			this.msBasic_Code.Text = "공통코드 관리";
			this.msBasic_Code.Click += new System.EventHandler(msBasic_Code_Click);
			this.msBasic_Sep1.Name = "msBasic_Sep1";
			this.msBasic_Sep1.Size = new System.Drawing.Size(175, 6);
			this.msBasic_User.Name = "msBasic_User";
			this.msBasic_User.Size = new System.Drawing.Size(178, 22);
			this.msBasic_User.Text = "사용자 관리";
			this.msBasic_User.Click += new System.EventHandler(msBasic_User_Click);
			this.msBasic_Usergroup.Name = "msBasic_Usergroup";
			this.msBasic_Usergroup.Size = new System.Drawing.Size(178, 22);
			this.msBasic_Usergroup.Text = "사용자권한 관리";
			this.msBasic_Usergroup.Click += new System.EventHandler(msBasic_Usergroup_Click);
			this.msBasic_Sep2.Name = "msBasic_Sep2";
			this.msBasic_Sep2.Size = new System.Drawing.Size(175, 6);
			this.msBasic_Menu.Name = "msBasic_Menu";
			this.msBasic_Menu.Size = new System.Drawing.Size(178, 22);
			this.msBasic_Menu.Text = "메뉴 관리";
			this.msBasic_Menu.Click += new System.EventHandler(msBasic_Menu_Click);
			this.msBasic_Auth.Name = "msBasic_Auth";
			this.msBasic_Auth.Size = new System.Drawing.Size(178, 22);
			this.msBasic_Auth.Text = "메뉴권한 관리";
			this.msBasic_Auth.Click += new System.EventHandler(msBasic_Auth_Click);
			this.msBasic_Sep3.Name = "msBasic_Sep3";
			this.msBasic_Sep3.Size = new System.Drawing.Size(175, 6);
			this.msBasic_UnitProcessMng.Name = "msBasic_UnitProcessMng";
			this.msBasic_UnitProcessMng.Size = new System.Drawing.Size(178, 22);
			this.msBasic_UnitProcessMng.Text = "단위공정 관리";
			this.msBasic_UnitProcessMng.Click += new System.EventHandler(msBasic_UnitProcessMng_Click);
			this.msBasic_UnitProcessLine.Name = "msBasic_UnitProcessLine";
			this.msBasic_UnitProcessLine.Size = new System.Drawing.Size(178, 22);
			this.msBasic_UnitProcessLine.Text = "단위공정라인 관리";
			this.msBasic_UnitProcessLine.Click += new System.EventHandler(msBasic_UnitProcessLine_Click);
			this.msBasic_LineMng.Name = "msBasic_LineMng";
			this.msBasic_LineMng.Size = new System.Drawing.Size(178, 22);
			this.msBasic_LineMng.Text = "공정라인 관리";
			this.msBasic_LineMng.Click += new System.EventHandler(msBasic_LineMng_Click);
			this.msBasic_ProcessLine.Name = "msBasic_ProcessLine";
			this.msBasic_ProcessLine.Size = new System.Drawing.Size(178, 22);
			this.msBasic_ProcessLine.Text = "공정라인 구성 관리";
			this.msBasic_ProcessLine.Click += new System.EventHandler(msBasic_ProcessLine_Click);
			this.msBasic_Sep4.Name = "msBasic_Sep4";
			this.msBasic_Sep4.Size = new System.Drawing.Size(175, 6);
			this.msBasic_Customer.Name = "msBasic_Customer";
			this.msBasic_Customer.Size = new System.Drawing.Size(178, 22);
			this.msBasic_Customer.Text = "업체 관리";
			this.msBasic_Customer.Click += new System.EventHandler(msBasic_Customer_Click);
			this.msBasic_Sep5.Name = "msBasic_Sep5";
			this.msBasic_Sep5.Size = new System.Drawing.Size(175, 6);
			this.msBasic_Sep5.Visible = false;
			this.msBasic_CaptionUpdate.Name = "msBasic_CaptionUpdate";
			this.msBasic_CaptionUpdate.Size = new System.Drawing.Size(178, 22);
			this.msBasic_CaptionUpdate.Text = "Caption 관리(Text)";
			this.msBasic_CaptionUpdate.Visible = false;
			this.msBasic_CaptionUpdate.Click += new System.EventHandler(msBasic_CaptionUpdate_Click);
			this.msStandard.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[10] { this.msStandard_ModelMng, this.msStandard_ModelProperty, this.msStandard_AssyGroupMstMng, this.msStandard_Sep1, this.msStandard_ProcessMng, this.msStandard_RouteMng, this.msStandard_ProdRouteMng, this.msStandard_TactTimeMng, this.msStandard_PackingUnitMng, this.msStandard_UnitProcesStdWorkTimeMng });
			this.msStandard.Name = "msStandard";
			this.msStandard.Size = new System.Drawing.Size(78, 20);
			this.msStandard.Text = "기준설정(&I)";
			this.msStandard_ModelMng.Name = "msStandard_ModelMng";
			this.msStandard_ModelMng.Size = new System.Drawing.Size(226, 22);
			this.msStandard_ModelMng.Text = "모델관리";
			this.msStandard_ModelMng.Visible = false;
			this.msStandard_ModelMng.Click += new System.EventHandler(msStandard_ModelMng_Click);
			this.msStandard_ModelProperty.Name = "msStandard_ModelProperty";
			this.msStandard_ModelProperty.Size = new System.Drawing.Size(226, 22);
			this.msStandard_ModelProperty.Text = "모델 속성 일괄 편집";
			this.msStandard_ModelProperty.Visible = false;
			this.msStandard_ModelProperty.Click += new System.EventHandler(msStandard_ModelProperty_Click);
			this.msStandard_AssyGroupMstMng.Name = "msStandard_AssyGroupMstMng";
			this.msStandard_AssyGroupMstMng.Size = new System.Drawing.Size(226, 22);
			this.msStandard_AssyGroupMstMng.Text = "Assy Group 모델 관리";
			this.msStandard_AssyGroupMstMng.Click += new System.EventHandler(msStandard_AssyGroupMstMng_Click);
			this.msStandard_Sep1.Name = "msStandard_Sep1";
			this.msStandard_Sep1.Size = new System.Drawing.Size(223, 6);
			this.msStandard_ProcessMng.Name = "msStandard_ProcessMng";
			this.msStandard_ProcessMng.Size = new System.Drawing.Size(226, 22);
			this.msStandard_ProcessMng.Text = "공정관리";
			this.msStandard_ProcessMng.Visible = false;
			this.msStandard_ProcessMng.Click += new System.EventHandler(msStandard_ProcessMng_Click);
			this.msStandard_RouteMng.Name = "msStandard_RouteMng";
			this.msStandard_RouteMng.Size = new System.Drawing.Size(226, 22);
			this.msStandard_RouteMng.Text = "라우터 관리";
			this.msStandard_RouteMng.Click += new System.EventHandler(msStandard_RouteMng_Click);
			this.msStandard_ProdRouteMng.Name = "msStandard_ProdRouteMng";
			this.msStandard_ProdRouteMng.Size = new System.Drawing.Size(226, 22);
			this.msStandard_ProdRouteMng.Text = "생산 라우터 관리";
			this.msStandard_ProdRouteMng.Click += new System.EventHandler(msStandard_ProdRouteMng_Click);
			this.msStandard_TactTimeMng.Name = "msStandard_TactTimeMng";
			this.msStandard_TactTimeMng.Size = new System.Drawing.Size(226, 22);
			this.msStandard_TactTimeMng.Text = "Tact Time 관리";
			this.msStandard_TactTimeMng.Click += new System.EventHandler(msStandard_TactTimeMng_Click);
			this.msStandard_PackingUnitMng.Name = "msStandard_PackingUnitMng";
			this.msStandard_PackingUnitMng.Size = new System.Drawing.Size(226, 22);
			this.msStandard_PackingUnitMng.Text = "포장단위 관리";
			this.msStandard_PackingUnitMng.Click += new System.EventHandler(msStandard_PackingUnitMng_Click);
			this.msStandard_UnitProcesStdWorkTimeMng.Name = "msStandard_UnitProcesStdWorkTimeMng";
			this.msStandard_UnitProcesStdWorkTimeMng.Size = new System.Drawing.Size(226, 22);
			this.msStandard_UnitProcesStdWorkTimeMng.Text = "단위공정 기준작업시간 관리";
			this.msStandard_UnitProcesStdWorkTimeMng.Visible = false;
			this.msStandard_UnitProcesStdWorkTimeMng.Click += new System.EventHandler(msStandard_UnitProcesStdWorkTimeMng_Click);
			this.msWindow.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[3] { this.msWindow_Horizontal, this.msWindow_Vertical, this.msWindow_Cascade });
			this.msWindow.Name = "msWindow";
			this.msWindow.Size = new System.Drawing.Size(82, 20);
			this.msWindow.Text = "Window(&W)";
			this.msWindow_Horizontal.Name = "msWindow_Horizontal";
			this.msWindow_Horizontal.Size = new System.Drawing.Size(152, 22);
			this.msWindow_Horizontal.Text = "Tile Horizontal";
			this.msWindow_Horizontal.Click += new System.EventHandler(msWindow_Horizontal_Click);
			this.msWindow_Vertical.Name = "msWindow_Vertical";
			this.msWindow_Vertical.Size = new System.Drawing.Size(152, 22);
			this.msWindow_Vertical.Text = "Tile Vertical";
			this.msWindow_Vertical.Click += new System.EventHandler(msWindow_Vertical_Click);
			this.msWindow_Cascade.Name = "msWindow_Cascade";
			this.msWindow_Cascade.Size = new System.Drawing.Size(152, 22);
			this.msWindow_Cascade.Text = "Cascade";
			this.msWindow_Cascade.Click += new System.EventHandler(msWindow_Cascade_Click);
			this.msHelp.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[4] { this.msHelp_Help, this.msHelp_Sep1, this.msHelp_About, this.msHelp_TestWindow });
			this.msHelp.Name = "msHelp";
			this.msHelp.Size = new System.Drawing.Size(72, 20);
			this.msHelp.Text = "도움말(&H)";
			this.msHelp_Help.Name = "msHelp_Help";
			this.msHelp_Help.Size = new System.Drawing.Size(162, 22);
			this.msHelp_Help.Text = "사용자 도움말";
			this.msHelp_Sep1.Name = "msHelp_Sep1";
			this.msHelp_Sep1.Size = new System.Drawing.Size(159, 6);
			this.msHelp_About.Name = "msHelp_About";
			this.msHelp_About.Size = new System.Drawing.Size(162, 22);
			this.msHelp_About.Text = "Abount 2S MES";
			this.msHelp_TestWindow.Name = "msHelp_TestWindow";
			this.msHelp_TestWindow.Size = new System.Drawing.Size(162, 22);
			this.msHelp_TestWindow.Text = "Sample Window";
			this.ilToolbar.ImageStream = (System.Windows.Forms.ImageListStreamer)resources.GetObject("ilToolbar.ImageStream");
			this.ilToolbar.TransparentColor = System.Drawing.Color.Transparent;
			this.ilToolbar.Images.SetKeyName(0, "01_New_e.jpg");
			this.ilToolbar.Images.SetKeyName(1, "01_New_d.jpg");
			this.ilToolbar.Images.SetKeyName(2, "02_Select_e.jpg");
			this.ilToolbar.Images.SetKeyName(3, "02_Select_d.jpg");
			this.ilToolbar.Images.SetKeyName(4, "03_Save_e.jpg");
			this.ilToolbar.Images.SetKeyName(5, "03_Save_d.jpg");
			this.ilToolbar.Images.SetKeyName(6, "04_Delete_e.jpg");
			this.ilToolbar.Images.SetKeyName(7, "04_Delete_d.jpg");
			this.ilToolbar.Images.SetKeyName(8, "05_Excel_e.jpg");
			this.ilToolbar.Images.SetKeyName(9, "05_Excel_d.jpg");
			this.ilToolbar.Images.SetKeyName(10, "06_Print_e.jpg");
			this.ilToolbar.Images.SetKeyName(11, "06_Print_d.jpg");
			this.ilToolbar.Images.SetKeyName(12, "07_PrintPreview_e.jpg");
			this.ilToolbar.Images.SetKeyName(13, "07_PrintPreview_d.jpg");
			this.ilToolbar.Images.SetKeyName(14, "08_Setting_e.jpg");
			this.ilToolbar.Images.SetKeyName(15, "08_Setting_d.jpg");
			this.ilToolbar.Images.SetKeyName(16, "09_Exit_e.jpg");
			this.ilToolbar.Images.SetKeyName(17, "09_Exit_d.jpg");
			this.tmrStatusBar.Enabled = true;
			this.tmrStatusBar.Interval = 3000;
			this.tmrStatusBar.Tick += new System.EventHandler(tmrStatusBar_Tick);
			this.msBasic_MenuAccessLogs.Name = "msBasic_MenuAccessLogs";
			this.msBasic_MenuAccessLogs.Size = new System.Drawing.Size(178, 22);
			this.msBasic_MenuAccessLogs.Text = "사용자 LOG 조회";
			this.msBasic_MenuAccessLogs.Click += new System.EventHandler(msBasic_MenuAccessLogs_Click);
			base.AutoScaleDimensions = new System.Drawing.SizeF(7f, 14f);
			base.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.BackgroundImage = (System.Drawing.Image)resources.GetObject("$this.BackgroundImage");
			base.ClientSize = new System.Drawing.Size(1384, 812);
			base.Controls.Add(this.tsToolbar);
			base.Controls.Add(this.statusBar);
			base.Controls.Add(this.msMainMenu);
			this.Font = new System.Drawing.Font("Tahoma", 9f, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, 0);
			base.Icon = (System.Drawing.Icon)resources.GetObject("$this.Icon");
			base.IsMdiContainer = true;
			base.MainMenuStrip = this.msMainMenu;
			base.Name = "frmMDIMain";
			this.Text = "2S MES 기준정보";
			base.WindowState = System.Windows.Forms.FormWindowState.Maximized;
			base.Load += new System.EventHandler(frmMain_Load);
			this.tsToolbar.ResumeLayout(false);
			this.tsToolbar.PerformLayout();
			this.statusBar.ResumeLayout(false);
			this.statusBar.PerformLayout();
			this.msMainMenu.ResumeLayout(false);
			this.msMainMenu.PerformLayout();
			base.ResumeLayout(false);
			base.PerformLayout();
		}
	}
}
