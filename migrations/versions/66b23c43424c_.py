"""empty message

Revision ID: 66b23c43424c
Revises: 
Create Date: 2024-05-28 23:24:52.766138

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '66b23c43424c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('activity_frequency',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('mode', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('mode')
    )
    op.create_table('availability',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('day', sa.String(length=120), nullable=False),
    sa.Column('hour', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('day')
    )
    op.create_table('diseases',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('kind', sa.String(length=120), nullable=False),
    sa.Column('sintoms', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('kind')
    )
    op.create_table('education',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('rank', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('experience',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('time', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('time')
    )
    op.create_table('goals',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('kind', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=180), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('kind')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('client',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('username', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('first_name', sa.String(length=120), nullable=True),
    sa.Column('last_name', sa.String(length=120), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('height', sa.Integer(), nullable=True),
    sa.Column('weight', sa.Integer(), nullable=True),
    sa.Column('gender', sa.String(length=120), nullable=True),
    sa.Column('physical_habits', sa.String(length=120), nullable=True),
    sa.Column('activity_frequency_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['activity_frequency_id'], ['activity_frequency.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('client')
    op.drop_table('user')
    op.drop_table('goals')
    op.drop_table('experience')
    op.drop_table('education')
    op.drop_table('diseases')
    op.drop_table('availability')
    op.drop_table('activity_frequency')
    # ### end Alembic commands ###